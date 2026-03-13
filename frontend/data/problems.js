export const PROBLEMS = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
      notes: [
        "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        "You can return the answer in any order.",
      ],
    },
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]
console.log(twoSum([3, 3], 6)); // Expected: [0, 1]`,
      python: `def twoSum(nums, target):
    # Write your solution here
    pass

# Test cases
print(twoSum([2, 7, 11, 15], 9))  # Expected: [0, 1]
print(twoSum([3, 2, 4], 6))  # Expected: [1, 2]
print(twoSum([3, 3], 6))  # Expected: [0, 1]`,
      java: `import java.util.*;

class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9))); // Expected: [0, 1]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 2, 4}, 6))); // Expected: [1, 2]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 3}, 6))); // Expected: [0, 1]
    }
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your solution here
    
    return {};
}

int main() {
    vector<int> n1 = {2, 7, 11, 15};
    auto r1 = twoSum(n1, 9);
    cout << "[" << r1[0] << "," << r1[1] << "]" << endl; // Expected: [0,1]

    vector<int> n2 = {3, 2, 4};
    auto r2 = twoSum(n2, 6);
    cout << "[" << r2[0] << "," << r2[1] << "]" << endl; // Expected: [1,2]

    vector<int> n3 = {3, 3};
    auto r3 = twoSum(n3, 6);
    cout << "[" << r3[0] << "," << r3[1] << "]" << endl; // Expected: [0,1]

    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[0,1]\n[1,2]\n[0,1]",
      python: "[0, 1]\n[1, 2]\n[0, 1]",
      java: "[0, 1]\n[1, 2]\n[0, 1]",
      cpp: "[0,1]\n[1,2]\n[0,1]",
    },
  },

  "reverse-string": {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "Write a function that reverses a string. The input string is given as an array of characters s.",
      notes: ["You must do this by modifying the input array in-place with O(1) extra memory."],
    },
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
      },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ascii character"],
    starterCode: {
      javascript: `function reverseString(s) {
  // Write your solution here
  
}

// Test cases
let test1 = ["h","e","l","l","o"];
reverseString(test1);
console.log(test1); // Expected: ["o","l","l","e","h"]

let test2 = ["H","a","n","n","a","h"];
reverseString(test2);
console.log(test2); // Expected: ["h","a","n","n","a","H"]`,
      python: `def reverseString(s):
    # Write your solution here
    pass

# Test cases
test1 = ["h","e","l","l","o"]
reverseString(test1)
print(test1)  # Expected: ["o","l","l","e","h"]

test2 = ["H","a","n","n","a","h"]
reverseString(test2)
print(test2)  # Expected: ["h","a","n","n","a","H"]`,
      java: `import java.util.*;

class Solution {
    public static void reverseString(char[] s) {
        // Write your solution here
        
    }
    
    public static void main(String[] args) {
        char[] test1 = {'h','e','l','l','o'};
        reverseString(test1);
        System.out.println(Arrays.toString(test1)); // Expected: [o, l, l, e, h]
        
        char[] test2 = {'H','a','n','n','a','h'};
        reverseString(test2);
        System.out.println(Arrays.toString(test2)); // Expected: [h, a, n, n, a, H]
    }
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

void reverseString(vector<char>& s) {
    // Write your solution here
    
}

int main() {
    vector<char> test1 = {'h','e','l','l','o'};
    reverseString(test1);
    cout << "[";
    for (int i = 0; i < test1.size(); i++) cout << (i ? "," : "") << test1[i];
    cout << "]" << endl; // Expected: [o,l,l,e,h]

    vector<char> test2 = {'H','a','n','n','a','h'};
    reverseString(test2);
    cout << "[";
    for (int i = 0; i < test2.size(); i++) cout << (i ? "," : "") << test2[i];
    cout << "]" << endl; // Expected: [h,a,n,n,a,H]

    return 0;
}`,
    },
    expectedOutput: {
      javascript: '["o","l","l","e","h"]\n["h","a","n","n","a","H"]',
      python: "['o', 'l', 'l', 'e', 'h']\n['h', 'a', 'n', 'n', 'a', 'H']",
      java: "[o, l, l, e, h]\n[h, a, n, n, a, H]",
      cpp: "[o,l,l,e,h]\n[h,a,n,n,a,H]",
    },
  },

  "valid-palindrome": {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.",
      notes: ["Given a string s, return true if it is a palindrome, or false otherwise."],
    },
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation: '"raceacar" is not a palindrome.',
      },
      {
        input: 's = " "',
        output: "true",
        explanation:
          's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.',
      },
    ],
    constraints: ["1 ≤ s.length ≤ 2 * 10⁵", "s consists only of printable ASCII characters"],
    starterCode: {
      javascript: `function isPalindrome(s) {
  // Write your solution here
  
}

// Test cases
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
console.log(isPalindrome("race a car")); // Expected: false
console.log(isPalindrome(" ")); // Expected: true`,
      python: `def isPalindrome(s):
    # Write your solution here
    pass

# Test cases
print(isPalindrome("A man, a plan, a canal: Panama"))  # Expected: True
print(isPalindrome("race a car"))  # Expected: False
print(isPalindrome(" "))  # Expected: True`,
      java: `class Solution {
    public static boolean isPalindrome(String s) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
        System.out.println(isPalindrome("race a car")); // Expected: false
        System.out.println(isPalindrome(" ")); // Expected: true
    }
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

bool isPalindrome(string s) {
    // Write your solution here
    
    return false;
}

int main() {
    cout << boolalpha;
    cout << isPalindrome("A man, a plan, a canal: Panama") << endl; // Expected: true
    cout << isPalindrome("race a car") << endl; // Expected: false
    cout << isPalindrome(" ") << endl; // Expected: true
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "true\nfalse\ntrue",
      python: "True\nFalse\nTrue",
      java: "true\nfalse\ntrue",
      cpp: "true\nfalse\ntrue",
    },
  },

  "maximum-subarray": {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Array • Dynamic Programming",
    description: {
      text: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1.",
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The subarray [5,4,-1,7,8] has the largest sum 23.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxSubArray(nums) {
  // Write your solution here
  
}

// Test cases
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Expected: 6
console.log(maxSubArray([1])); // Expected: 1
console.log(maxSubArray([5,4,-1,7,8])); // Expected: 23`,
      python: `def maxSubArray(nums):
    # Write your solution here
    pass

# Test cases
print(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))  # Expected: 6
print(maxSubArray([1]))  # Expected: 1
print(maxSubArray([5,4,-1,7,8]))  # Expected: 23`,
      java: `class Solution {
    public static int maxSubArray(int[] nums) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4})); // Expected: 6
        System.out.println(maxSubArray(new int[]{1})); // Expected: 1
        System.out.println(maxSubArray(new int[]{5,4,-1,7,8})); // Expected: 23
    }
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int maxSubArray(vector<int>& nums) {
    // Write your solution here
    
    return 0;
}

int main() {
    vector<int> n1 = {-2,1,-3,4,-1,2,1,-5,4};
    cout << maxSubArray(n1) << endl; // Expected: 6

    vector<int> n2 = {1};
    cout << maxSubArray(n2) << endl; // Expected: 1

    vector<int> n3 = {5,4,-1,7,8};
    cout << maxSubArray(n3) << endl; // Expected: 23

    return 0;
}`,
    },
    expectedOutput: {
      javascript: "6\n1\n23",
      python: "6\n1\n23",
      java: "6\n1\n23",
      cpp: "6\n1\n23",
    },
  },

  "container-with-most-water": {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Array • Two Pointers",
    description: {
      text: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).",
      notes: [
        "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
        "Return the maximum amount of water a container can store.",
        "Notice that you may not slant the container.",
      ],
    },
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation:
          "The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.",
      },
      {
        input: "height = [1,1]",
        output: "1",
      },
    ],
    constraints: ["n == height.length", "2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxArea(height) {
  // Write your solution here
  
}

// Test cases
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // Expected: 49
console.log(maxArea([1,1])); // Expected: 1`,
      python: `def maxArea(height):
    # Write your solution here
    pass

# Test cases
print(maxArea([1,8,6,2,5,4,8,3,7]))  # Expected: 49
print(maxArea([1,1]))  # Expected: 1`,
      java: `class Solution {
    public static int maxArea(int[] height) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxArea(new int[]{1,8,6,2,5,4,8,3,7})); // Expected: 49
        System.out.println(maxArea(new int[]{1,1})); // Expected: 1
    }
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int maxArea(vector<int>& height) {
    // Write your solution here
    
    return 0;
}

int main() {
    vector<int> h1 = {1,8,6,2,5,4,8,3,7};
    cout << maxArea(h1) << endl; // Expected: 49

    vector<int> h2 = {1,1};
    cout << maxArea(h2) << endl; // Expected: 1

    return 0;
}`,
    },
    expectedOutput: {
      javascript: "49\n1",
      python: "49\n1",
      java: "49\n1",
      cpp: "49\n1",
    },
  },

  "contains-duplicate": {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an integer array nums, return true if any value appears at least twice in the array.",
      notes: ["Return false if every element is distinct."],
    },
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "true",
      },
      {
        input: "nums = [1,2,3,4]",
        output: "false",
      },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 10⁵",
      "-10⁹ ≤ nums[i] ≤ 10⁹"
    ],
    starterCode: {
      // FIX: added second test case call and comment
      javascript: `function containsDuplicate(nums) {
  // Write your solution here
}

// Test cases
console.log(containsDuplicate([1,2,3,1])); // Expected: true
console.log(containsDuplicate([1,2,3,4])); // Expected: false`,
      // FIX: added second test case call, expected output comment, and pass comment
      python: `def containsDuplicate(nums):
    # Write your solution here
    pass

# Test cases
print(containsDuplicate([1,2,3,1]))  # Expected: True
print(containsDuplicate([1,2,3,4]))  # Expected: False`,
      // FIX: added main() with both test cases
      java: `class Solution {
    public static boolean containsDuplicate(int[] nums) {
        // Write your solution here
        return false;
    }

    public static void main(String[] args) {
        System.out.println(containsDuplicate(new int[]{1,2,3,1})); // Expected: true
        System.out.println(containsDuplicate(new int[]{1,2,3,4})); // Expected: false
    }
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

bool containsDuplicate(vector<int>& nums) {
    // Write your solution here
    
    return false;
}

int main() {
    cout << boolalpha;
    vector<int> n1 = {1,2,3,1};
    cout << containsDuplicate(n1) << endl; // Expected: true

    vector<int> n2 = {1,2,3,4};
    cout << containsDuplicate(n2) << endl; // Expected: false

    return 0;
}`,
    },
    // FIX: python and java expectedOutput now match their two-line output
    expectedOutput: {
      javascript: "true\nfalse",
      python: "True\nFalse",
      java: "true\nfalse",
      cpp: "true\nfalse",
    },
  },

  "merge-two-sorted-lists": {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List • Recursion",
    description: {
      text: "Merge two sorted linked lists and return it as a sorted list.",
      notes: []
    },
    examples: [
      {
        input: "l1 = [1,2,4], l2 = [1,3,4]",
        output: "[1,1,2,3,4,4]"
      }
    ],
    constraints: [
      "0 ≤ list length ≤ 50"
    ],
    starterCode: {
      // FIX: added array-based helper + test call for JS
      javascript: `function mergeTwoLists(l1, l2) {
  // Write your solution here
  // Hint: treat l1/l2 as arrays for simplicity; return merged sorted array
}

// Test cases
console.log(JSON.stringify(mergeTwoLists([1,2,4], [1,3,4]))); // Expected: [1,1,2,3,4,4]`,
      // FIX: added array-based helper + test call for Python
      python: `def mergeTwoLists(l1, l2):
    # Write your solution here
    pass

# Test cases
print(mergeTwoLists([1,2,4], [1,3,4]))  # Expected: [1, 1, 2, 3, 4, 4]`,
      // FIX: added main() with test case for Java
      java: `import java.util.*;

class Solution {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int x) { val = x; }
    }

    public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        // Write your solution here
        return null;
    }

    static ListNode build(int[] arr) {
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        for (int x : arr) { cur.next = new ListNode(x); cur = cur.next; }
        return dummy.next;
    }

    static String listToString(ListNode head) {
        StringBuilder sb = new StringBuilder("[");
        boolean first = true;
        while (head != null) {
            if (!first) sb.append(",");
            sb.append(head.val);
            first = false;
            head = head.next;
        }
        sb.append("]");
        return sb.toString();
    }

    public static void main(String[] args) {
        ListNode l1 = build(new int[]{1,2,4});
        ListNode l2 = build(new int[]{1,3,4});
        System.out.println(listToString(mergeTwoLists(l1, l2))); // Expected: [1,1,2,3,4,4]
    }
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    // Write your solution here
    
    return nullptr;
}

ListNode* build(vector<int> v) {
    ListNode* dummy = new ListNode(0);
    ListNode* cur = dummy;
    for (int x : v) cur = cur->next = new ListNode(x);
    return dummy->next;
}

void print(ListNode* head) {
    cout << "[";
    bool first = true;
    while (head) { cout << (first ? "" : ",") << head->val; first = false; head = head->next; }
    cout << "]" << endl;
}

int main() {
    ListNode* l1 = build({1,2,4});
    ListNode* l2 = build({1,3,4});
    print(mergeTwoLists(l1, l2)); // Expected: [1,1,2,3,4,4]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[1,1,2,3,4,4]",
      python: "[1, 1, 2, 3, 4, 4]",
      java: "[1,1,2,3,4,4]",
      cpp: "[1,1,2,3,4,4]",
    },
  },

  "best-time-to-buy-sell-stock": {
    id: "best-time-to-buy-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Array • Greedy",
    description: {
      text: "You are given an array prices where prices[i] is the price of a given stock on the ith day.",
      notes: ["Return the maximum profit."]
    },
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5"
      }
    ],
    constraints: [
      "1 ≤ prices.length ≤ 10⁵"
    ],
    starterCode: {
      // FIX: added test call
      javascript: `function maxProfit(prices) {
  // Write your solution here
}

// Test cases
console.log(maxProfit([7,1,5,3,6,4])); // Expected: 5
console.log(maxProfit([7,6,4,3,1]));   // Expected: 0`,
      // FIX: added test calls
      python: `def maxProfit(prices):
    # Write your solution here
    pass

# Test cases
print(maxProfit([7,1,5,3,6,4]))  # Expected: 5
print(maxProfit([7,6,4,3,1]))    # Expected: 0`,
      // FIX: added main()
      java: `class Solution {
    public static int maxProfit(int[] prices) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(maxProfit(new int[]{7,1,5,3,6,4})); // Expected: 5
        System.out.println(maxProfit(new int[]{7,6,4,3,1}));   // Expected: 0
    }
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int maxProfit(vector<int>& prices) {
    // Write your solution here
    
    return 0;
}

int main() {
    vector<int> p1 = {7,1,5,3,6,4};
    cout << maxProfit(p1) << endl; // Expected: 5

    vector<int> p2 = {7,6,4,3,1};
    cout << maxProfit(p2) << endl; // Expected: 0

    return 0;
}`,
    },
    expectedOutput: {
      javascript: "5\n0",
      python: "5\n0",
      java: "5\n0",
      cpp: "5\n0",
    },
  },

  "3sum": {
    id: "3sum",
    title: "3Sum",
    difficulty: "Medium",
    category: "Array • Two Pointers",
    description: {
      text: "Given an integer array nums, return all the triplets such that they sum to zero.",
      notes: []
    },
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]"
      }
    ],
    constraints: [
      "3 ≤ nums.length ≤ 3000"
    ],
    starterCode: {
      // FIX: added test call
      javascript: `function threeSum(nums) {
  // Write your solution here
}

// Test cases
console.log(JSON.stringify(threeSum([-1,0,1,2,-1,-4]))); // Expected: [[-1,-1,2],[-1,0,1]]`,
      // FIX: added test call
      python: `def threeSum(nums):
    # Write your solution here
    pass

# Test cases
print(threeSum([-1,0,1,2,-1,-4]))  # Expected: [[-1,-1,2],[-1,0,1]]`,
      // FIX: added main() with test
      java: `import java.util.*;

class Solution {
    public static List<List<Integer>> threeSum(int[] nums) {
        // Write your solution here
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        System.out.println(threeSum(new int[]{-1,0,1,2,-1,-4})); // Expected: [[-1,-1,2],[-1,0,1]]
    }
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    // Write your solution here
    
    return {};
}

int main() {
    vector<int> nums = {-1,0,1,2,-1,-4};
    auto res = threeSum(nums);
    cout << "[";
    for (int i = 0; i < res.size(); i++) {
        cout << (i ? "," : "") << "[";
        for (int j = 0; j < res[i].size(); j++)
            cout << (j ? "," : "") << res[i][j];
        cout << "]";
    }
    cout << "]" << endl; // Expected: [[-1,-1,2],[-1,0,1]]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[[-1,-1,2],[-1,0,1]]",
      python: "[[-1,-1,2],[-1,0,1]]",
      java: "[[-1,-1,2],[-1,0,1]]",
      cpp: "[[-1,-1,2],[-1,0,1]]",
    },
  },

  "longest-substring-without-repeating": {
    id: "longest-substring-without-repeating",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String • Sliding Window",
    description: {
      text: "Find the length of the longest substring without repeating characters.",
      notes: []
    },
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3"
      }
    ],
    constraints: [
      "0 ≤ s.length ≤ 5 * 10⁴"
    ],
    starterCode: {
      // FIX: added test calls
      javascript: `function lengthOfLongestSubstring(s) {
  // Write your solution here
}

// Test cases
console.log(lengthOfLongestSubstring("abcabcbb")); // Expected: 3
console.log(lengthOfLongestSubstring("bbbbb"));    // Expected: 1
console.log(lengthOfLongestSubstring("pwwkew"));   // Expected: 3`,
      // FIX: added test calls
      python: `def lengthOfLongestSubstring(s):
    # Write your solution here
    pass

# Test cases
print(lengthOfLongestSubstring("abcabcbb"))  # Expected: 3
print(lengthOfLongestSubstring("bbbbb"))     # Expected: 1
print(lengthOfLongestSubstring("pwwkew"))    # Expected: 3`,
      // FIX: added main()
      java: `class Solution {
    public static int lengthOfLongestSubstring(String s) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("abcabcbb")); // Expected: 3
        System.out.println(lengthOfLongestSubstring("bbbbb"));    // Expected: 1
        System.out.println(lengthOfLongestSubstring("pwwkew"));   // Expected: 3
    }
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int lengthOfLongestSubstring(string s) {
    // Write your solution here
    
    return 0;
}

int main() {
    cout << lengthOfLongestSubstring("abcabcbb") << endl; // Expected: 3
    cout << lengthOfLongestSubstring("bbbbb") << endl;    // Expected: 1
    cout << lengthOfLongestSubstring("pwwkew") << endl;   // Expected: 3
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "3\n1\n3",
      python: "3\n1\n3",
      java: "3\n1\n3",
      cpp: "3\n1\n3",
    },
  },

  "search-in-rotated-array": {
    id: "search-in-rotated-array",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    description: {
      text: "Search target in rotated sorted array.",
      notes: []
    },
    examples: [
      {
        input: "nums=[4,5,6,7,0,1,2], target=0",
        output: "4"
      }
    ],
    constraints: [
      "1 ≤ nums.length ≤ 5000"
    ],
    starterCode: {
      // FIX: added test calls
      javascript: `function search(nums, target) {
  // Write your solution here
}

// Test cases
console.log(search([4,5,6,7,0,1,2], 0)); // Expected: 4
console.log(search([4,5,6,7,0,1,2], 3)); // Expected: -1`,
      // FIX: added test calls
      python: `def search(nums, target):
    # Write your solution here
    pass

# Test cases
print(search([4,5,6,7,0,1,2], 0))  # Expected: 4
print(search([4,5,6,7,0,1,2], 3))  # Expected: -1`,
      // FIX: added main()
      java: `class Solution {
    public static int search(int[] nums, int target) {
        // Write your solution here
        return -1;
    }

    public static void main(String[] args) {
        System.out.println(search(new int[]{4,5,6,7,0,1,2}, 0)); // Expected: 4
        System.out.println(search(new int[]{4,5,6,7,0,1,2}, 3)); // Expected: -1
    }
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int search(vector<int>& nums, int target) {
    // Write your solution here
    
    return -1;
}

int main() {
    vector<int> nums = {4,5,6,7,0,1,2};
    cout << search(nums, 0) << endl; // Expected: 4
    cout << search(nums, 3) << endl; // Expected: -1
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "4\n-1",
      python: "4\n-1",
      java: "4\n-1",
      cpp: "4\n-1",
    },
  },

  "coin-change": {
    id: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description: {
      text: "Return the fewest number of coins needed.",
      notes: []
    },
    examples: [
      {
        input: "coins=[1,2,5], amount=11",
        output: "3"
      }
    ],
    constraints: [
      "1 ≤ amount ≤ 10⁴"
    ],
    starterCode: {
      // FIX: added test calls
      javascript: `function coinChange(coins, amount) {
  // Write your solution here
}

// Test cases
console.log(coinChange([1,2,5], 11)); // Expected: 3
console.log(coinChange([2], 3));      // Expected: -1`,
      // FIX: added test calls
      python: `def coinChange(coins, amount):
    # Write your solution here
    pass

# Test cases
print(coinChange([1,2,5], 11))  # Expected: 3
print(coinChange([2], 3))       # Expected: -1`,
      // FIX: added main()
      java: `class Solution {
    public static int coinChange(int[] coins, int amount) {
        // Write your solution here
        return -1;
    }

    public static void main(String[] args) {
        System.out.println(coinChange(new int[]{1,2,5}, 11)); // Expected: 3
        System.out.println(coinChange(new int[]{2}, 3));      // Expected: -1
    }
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int coinChange(vector<int>& coins, int amount) {
    // Write your solution here
    
    return -1;
}

int main() {
    vector<int> c1 = {1,2,5};
    cout << coinChange(c1, 11) << endl; // Expected: 3

    vector<int> c2 = {2};
    cout << coinChange(c2, 3) << endl;  // Expected: -1

    return 0;
}`,
    },
    expectedOutput: {
      javascript: "3\n-1",
      python: "3\n-1",
      java: "3\n-1",
      cpp: "3\n-1",
    },
  },

  "merge-k-sorted-lists": {
    id: "merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    category: "Linked List • Heap",
    description: {
      text: "Merge k sorted linked lists and return it as one sorted list.",
      notes: []
    },
    examples: [
      {
        input: "lists=[[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,3,4,4,5,6]"
      }
    ],
    constraints: [
      "k ≤ 10⁴"
    ],
    starterCode: {
      // FIX: array-based approach + test call for JS
      javascript: `function mergeKLists(lists) {
  // Write your solution here
  // Hint: treat lists as arrays of numbers; return a merged sorted array
}

// Test cases
console.log(JSON.stringify(mergeKLists([[1,4,5],[1,3,4],[2,6]]))); // Expected: [1,1,2,3,4,4,5,6]`,
      // FIX: array-based approach + test call for Python
      python: `def mergeKLists(lists):
    # Write your solution here
    pass

# Test cases
print(mergeKLists([[1,4,5],[1,3,4],[2,6]]))  # Expected: [1, 1, 2, 3, 4, 4, 5, 6]`,
      // FIX: added main() with helper for Java
      java: `import java.util.*;

class Solution {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int x) { val = x; }
    }

    public static ListNode mergeKLists(ListNode[] lists) {
        // Write your solution here
        return null;
    }

    static ListNode build(int[] arr) {
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        for (int x : arr) { cur.next = new ListNode(x); cur = cur.next; }
        return dummy.next;
    }

    static String listToString(ListNode head) {
        StringBuilder sb = new StringBuilder("[");
        boolean first = true;
        while (head != null) {
            if (!first) sb.append(",");
            sb.append(head.val);
            first = false;
            head = head.next;
        }
        sb.append("]");
        return sb.toString();
    }

    public static void main(String[] args) {
        ListNode[] lists = {
            build(new int[]{1,4,5}),
            build(new int[]{1,3,4}),
            build(new int[]{2,6})
        };
        System.out.println(listToString(mergeKLists(lists))); // Expected: [1,1,2,3,4,4,5,6]
    }
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* mergeKLists(vector<ListNode*>& lists) {
    // Write your solution here
    
    return nullptr;
}

ListNode* build(vector<int> v) {
    ListNode* dummy = new ListNode(0);
    ListNode* cur = dummy;
    for (int x : v) cur = cur->next = new ListNode(x);
    return dummy->next;
}

void print(ListNode* head) {
    cout << "[";
    bool first = true;
    while (head) { cout << (first ? "" : ",") << head->val; first = false; head = head->next; }
    cout << "]" << endl;
}

int main() {
    vector<ListNode*> lists = {build({1,4,5}), build({1,3,4}), build({2,6})};
    print(mergeKLists(lists)); // Expected: [1,1,2,3,4,4,5,6]
    return 0;
}`,
    },
    expectedOutput: {
      javascript: "[1,1,2,3,4,4,5,6]",
      python: "[1, 1, 2, 3, 4, 4, 5, 6]",
      java: "[1,1,2,3,4,4,5,6]",
      cpp: "[1,1,2,3,4,4,5,6]",
    },
  },

  "median-of-two-sorted-arrays": {
    id: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Binary Search",
    description: {
      text: "Find median of two sorted arrays.",
      notes: []
    },
    examples: [
      {
        input: "nums1=[1,3], nums2=[2]",
        output: "2"
      }
    ],
    constraints: [
      "1 ≤ nums.length ≤ 1000"
    ],
    starterCode: {
      // FIX: added test calls
      javascript: `function findMedianSortedArrays(nums1, nums2) {
  // Write your solution here
}

// Test cases
console.log(findMedianSortedArrays([1,3], [2]));   // Expected: 2
console.log(findMedianSortedArrays([1,2], [3,4])); // Expected: 2.5`,
      // FIX: added test calls
      python: `def findMedianSortedArrays(nums1, nums2):
    # Write your solution here
    pass

# Test cases
print(findMedianSortedArrays([1,3], [2]))    # Expected: 2.0
print(findMedianSortedArrays([1,2], [3,4]))  # Expected: 2.5`,
      // FIX: added main()
      java: `class Solution {
    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Write your solution here
        return 0.0;
    }

    public static void main(String[] args) {
        System.out.println(findMedianSortedArrays(new int[]{1,3}, new int[]{2}));   // Expected: 2.0
        System.out.println(findMedianSortedArrays(new int[]{1,2}, new int[]{3,4})); // Expected: 2.5
    }
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    // Write your solution here
    
    return 0.0;
}

int main() {
    vector<int> n1 = {1,3}, n2 = {2};
    cout << findMedianSortedArrays(n1, n2) << endl; // Expected: 2

    vector<int> n3 = {1,2}, n4 = {3,4};
    cout << findMedianSortedArrays(n3, n4) << endl; // Expected: 2.5

    return 0;
}`,
    },
    expectedOutput: {
      javascript: "2\n2.5",
      python: "2.0\n2.5",
      java: "2.0\n2.5",
      cpp: "2\n2.5",
    },
  },

  "word-ladder": {
    id: "word-ladder",
    title: "Word Ladder",
    difficulty: "Hard",
    category: "Graph • BFS",
    description: {
      text: "Return the length of shortest transformation sequence.",
      notes: []
    },
    examples: [
      {
        input: 'beginWord="hit", endWord="cog"',
        output: "5"
      }
    ],
    constraints: [
      "1 ≤ word length ≤ 10"
    ],
    starterCode: {
      // FIX: added test calls
      javascript: `function ladderLength(beginWord, endWord, wordList) {
  // Write your solution here
}

// Test cases
console.log(ladderLength("hit", "cog", ["hot","dot","dog","lot","log","cog"])); // Expected: 5
console.log(ladderLength("hit", "cog", ["hot","dot","dog","lot","log"]));       // Expected: 0`,
      // FIX: added test calls
      python: `def ladderLength(beginWord, endWord, wordList):
    # Write your solution here
    pass

# Test cases
print(ladderLength("hit", "cog", ["hot","dot","dog","lot","log","cog"]))  # Expected: 5
print(ladderLength("hit", "cog", ["hot","dot","dog","lot","log"]))        # Expected: 0`,
      // FIX: added main()
      java: `import java.util.*;

class Solution {
    public static int ladderLength(String beginWord, String endWord, List<String> wordList) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(ladderLength("hit", "cog",
            Arrays.asList("hot","dot","dog","lot","log","cog"))); // Expected: 5
        System.out.println(ladderLength("hit", "cog",
            Arrays.asList("hot","dot","dog","lot","log")));       // Expected: 0
    }
}`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
    // Write your solution here
    
    return 0;
}

int main() {
    vector<string> wl1 = {"hot","dot","dog","lot","log","cog"};
    cout << ladderLength("hit", "cog", wl1) << endl; // Expected: 5

    vector<string> wl2 = {"hot","dot","dog","lot","log"};
    cout << ladderLength("hit", "cog", wl2) << endl; // Expected: 0

    return 0;
}`,
    },
    expectedOutput: {
      javascript: "5\n0",
      python: "5\n0",
      java: "5\n0",
      cpp: "5\n0",
    },
  },
};

export const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    icon: "/javascript.png",
    monacoLang: "javascript",
  },
  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
  },
  java: {
    name: "Java",
    icon: "/java.png",
    monacoLang: "java",
  },
  cpp: {
    name: "C++",
    icon: "/cpp.png",
    monacoLang: "cpp",
  },
};