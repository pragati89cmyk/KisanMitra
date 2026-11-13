package backend.concurrency;

import backend.Farmer;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Queue;

public class FarmerNotificationService {

    private final Object monitor = new Object();

    private final Queue<Farmer> queue = new ArrayDeque<>();

    private final int capacity;

    private final List<Thread> workers = new ArrayList<>();

    private boolean running = true;
    private boolean started = false;

    public FarmerNotificationService(int capacity) {
        if (capacity <= 0) {
            throw new IllegalArgumentException("Capacity must be positive");
        }

        this.capacity = capacity;
    }

    // Start two consumer threads
    public void start() {

        synchronized (monitor) {

            if (started) {
                return;
            }

            started = true;

            for (int i = 1; i <= 2; i++) {

                Thread worker = new Thread(
                        new Consumer(),
                        "Farmer-Consumer-" + i
                );

                workers.add(worker);
                worker.start();
            }
        }

        System.out.println("Farmer notification service started.");
    }

    // PRODUCER: Add a farmer to the queue
    public void publish(Farmer farmer) throws InterruptedException {

        Objects.requireNonNull(farmer);

        synchronized (monitor) {

            // Guarded block: wait if the queue is full
            while (running && queue.size() >= capacity) {

                System.out.println("Queue full. Producer waiting...");

                monitor.wait();
            }

            if (!running) {
                throw new IllegalStateException(
                        "Notification service is stopped"
                );
            }

            queue.offer(farmer);

            System.out.println(
                    "Producer added farmer: " + farmer.getName()
            );

            // Wake waiting consumers
            monitor.notifyAll();
        }
    }

    // CONSUMER: Process notifications
    private class Consumer implements Runnable {

        @Override
        public void run() {

            while (true) {

                Farmer farmer;

                synchronized (monitor) {

                    // Guarded block: wait if queue is empty
                    while (running && queue.isEmpty()) {

                        try {

                            System.out.println(
                                    Thread.currentThread().getName()
                                            + " is waiting..."
                            );

                            monitor.wait();

                        } catch (InterruptedException e) {

                            Thread.currentThread().interrupt();
                            return;
                        }
                    }

                    if (!running && queue.isEmpty()) {
                        return;
                    }

                    farmer = queue.poll();

                    // Notify producer that space is available
                    monitor.notifyAll();
                }

                // Process outside the synchronized block
                sendNotification(farmer);
            }
        }
    }

    private void sendNotification(Farmer farmer) {

        System.out.println(
                Thread.currentThread().getName()
                        + " processed registration notification for "
                        + farmer.getName()
        );
    }

    // Gracefully stop the service
    public void shutdown() {

        synchronized (monitor) {

            running = false;
            monitor.notifyAll();
        }

        for (Thread worker : workers) {

            try {
                worker.join();

            } catch (InterruptedException e) {

                Thread.currentThread().interrupt();
                break;
            }
        }

        System.out.println("Notification service stopped.");
    }
}
