package backend.filehandling;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.StreamTokenizer;

public class FarmerAdvancedFileService {

    // Byte stream: copy a file
    public void copyFile(String source, String destination)
            throws IOException {

        try (FileInputStream input =
                     new FileInputStream(source);
             FileOutputStream output =
                     new FileOutputStream(destination)) {

            byte[] buffer = new byte[1024];
            int bytesRead;

            while ((bytesRead = input.read(buffer)) != -1) {
                output.write(buffer, 0, bytesRead);
            }
        }

        System.out.println("File copied successfully!");
    }

    // StreamTokenizer: count words, numbers and symbols
    public void analyzeFile(String fileName)
            throws IOException {

        int words = 0;
        int numbers = 0;
        int symbols = 0;

        try (FileReader reader = new FileReader(fileName)) {

            StreamTokenizer tokenizer =
                    new StreamTokenizer(reader);

            int token;

            while ((token = tokenizer.nextToken())
                    != StreamTokenizer.TT_EOF) {

                if (token == StreamTokenizer.TT_WORD) {
                    words++;
                } else if (token == StreamTokenizer.TT_NUMBER) {
                    numbers++;
                } else {
                    symbols++;
                }
            }
        }

        System.out.println("Words: " + words);
        System.out.println("Numbers: " + numbers);
        System.out.println("Symbols: " + symbols);
    }
}
