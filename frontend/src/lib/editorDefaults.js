import { LANGUAGE_CONFIG, PROBLEMS } from "../../data/problems";

export const DEFAULT_EDITOR_LANGUAGE = "cpp";
export const DEFAULT_EDITOR_THEME = "vs-dark";

export const FALLBACK_STARTER_CODE = {
  javascript: `function solution() {
  // Write your solution here
}

console.log(solution());`,
  python: `def solution():
    # Write your solution here
    pass

print(solution())`,
  java: `class Solution {
    public static void main(String[] args) {
        // Write your solution here
    }
}`,
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write your solution here
    return 0;
}`,
};

export function getValidLanguage(language) {
  return LANGUAGE_CONFIG[language] ? language : DEFAULT_EDITOR_LANGUAGE;
}

export function getDefaultProblem() {
  return PROBLEMS["two-sum"] ?? Object.values(PROBLEMS)[0];
}

export function getStarterCode(problem, language) {
  const validLanguage = getValidLanguage(language);
  return (
    problem?.starterCode?.[validLanguage] ??
    FALLBACK_STARTER_CODE[validLanguage] ??
    ""
  );
}
