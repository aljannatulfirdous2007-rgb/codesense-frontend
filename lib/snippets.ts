import type { Language } from "@/types";

export const DEFAULT_SNIPPETS: Record<Language, string> = {
  javascript: `// Fibonacci with memoization
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n]
  if (n <= 1) return n
  
  let result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
  memo[n] = result
  return result
}

async function fetchUserData(userId) {
  const response = await fetch(\`/api/users/\${userId}\`)
  const data = response.json()
  return data
}

let count = 0
const items = [1, 2, 3, 4, 5]
for (let i = 0; i < items.length; i++) {
  count = count + items[i]
}

console.log('Total:', count)`,

  python: `# User data processor
import requests
from typing import List

def process_users(user_ids):
    results = []
    for id in user_ids:
        response = requests.get(f"https://api.example.com/users/{id}")
        data = response.json()
        results.append(data)
    return results

def calculate_average(numbers: List[float]):
    total = 0
    for num in numbers:
        total = total + num
    avg = total / len(numbers)
    return avg

users = process_users([1, 2, 3])
print(users)`,

  java: `import java.util.ArrayList;
import java.util.List;

public class UserService {
    private List<String> users = new ArrayList();
    
    public void addUser(String name) {
        if (name != null) {
            users.add(name);
        }
    }
    
    public String getUser(int index) {
        return users.get(index);
    }
    
    public static void main(String[] args) {
        UserService service = new UserService();
        service.addUser("Alice");
        service.addUser("Bob");
        System.out.println(service.getUser(0));
        System.out.println(service.getUser(5)); // Potential exception
    }
}`,

  cpp: `#include <iostream>
#include <vector>
#include <string>

class DataProcessor {
public:
    std::vector<int> data;
    
    void addData(int value) {
        data.push_back(value);
    }
    
    double calculateMean() {
        int total = 0;
        for (int i = 0; i < data.size(); i++) {
            total += data[i];
        }
        return total / data.size(); // Integer division bug
    }
    
    int* getFirst() {
        return &data[0]; // Unsafe if data is empty
    }
};

int main() {
    DataProcessor dp;
    dp.addData(10);
    dp.addData(20);
    std::cout << "Mean: " << dp.calculateMean() << std::endl;
    return 0;
}`,
};
