package backend.collections;

import backend.Farmer;

import java.util.*;

public class FarmerCollectionService {

    public void demonstrateCollections(List<Farmer> farmers) {

        // 1. LinkedList
        LinkedList<Farmer> farmerList =
                new LinkedList<>(farmers);

        // 2. HashSet: unique phone numbers, no guaranteed order
        Set<String> hashSet = new HashSet<>();

        // 3. LinkedHashSet: unique states, insertion order
        Set<String> linkedHashSet = new LinkedHashSet<>();

        // 4. TreeSet: unique villages, sorted order
        Set<String> treeSet = new TreeSet<>();

        for (Farmer farmer : farmers) {
            hashSet.add(farmer.getPhone());
            linkedHashSet.add(farmer.getState());
            treeSet.add(farmer.getVillage());
        }

        // 5. HashMap: key-value pairs, no guaranteed order
        Map<String, Farmer> hashMap = new HashMap<>();

        // 6. LinkedHashMap: maintains insertion order
        Map<String, Farmer> linkedHashMap = new LinkedHashMap<>();

        // 7. TreeMap: sorts entries by key
        Map<String, Farmer> treeMap = new TreeMap<>();

        for (Farmer farmer : farmers) {
            hashMap.put(farmer.getPhone(), farmer);
            linkedHashMap.put(farmer.getPhone(), farmer);
            treeMap.put(farmer.getPhone(), farmer);
        }

        // 8. PriorityQueue: natural ordering by Farmer name
        PriorityQueue<Farmer> priorityQueue =
                new PriorityQueue<>(farmers);

        // 9. Deque: insertion and removal at both ends
        Deque<Farmer> deque = new ArrayDeque<>();
        deque.addFirst(new Farmer("First Farmer", "0000000001",
                "Village A", "Punjab"));
        deque.addLast(new Farmer("Last Farmer", "0000000002",
                "Village B", "Punjab"));

        // 10. Iterator: forward traversal
        Iterator<Farmer> iterator = farmerList.iterator();

        while (iterator.hasNext()) {
            Farmer farmer = iterator.next();
            System.out.println("Iterator: " + farmer.getName());
        }

        // 11. ListIterator: forward and backward traversal
        ListIterator<Farmer> listIterator =
                farmerList.listIterator();

        while (listIterator.hasNext()) {
            System.out.println("Forward: "
                    + listIterator.next().getName());
        }

        while (listIterator.hasPrevious()) {
            System.out.println("Backward: "
                    + listIterator.previous().getName());
        }

        // 12. Comparable: natural ordering by name
        Collections.sort(farmerList);

        // 13. Comparator: custom ordering by state, then name
        farmerList.sort(
                Comparator.comparing(Farmer::getState)
                        .thenComparing(Farmer::getName)
        );

        System.out.println("HashSet: " + hashSet);
        System.out.println("LinkedHashSet: " + linkedHashSet);
        System.out.println("TreeSet: " + treeSet);

        System.out.println("HashMap size: " + hashMap.size());
        System.out.println("LinkedHashMap size: "
                + linkedHashMap.size());
        System.out.println("TreeMap size: " + treeMap.size());

        System.out.println("PriorityQueue size: "
                + priorityQueue.size());

        System.out.println("Deque first: "
                + deque.peekFirst().getName());
        System.out.println("Deque last: "
                + deque.peekLast().getName());

        System.out.println("Farmers sorted by state and name:");
        for (Farmer farmer : farmerList) {
            System.out.println(farmer.getName()
                    + " - " + farmer.getState());
        }
    }
}
