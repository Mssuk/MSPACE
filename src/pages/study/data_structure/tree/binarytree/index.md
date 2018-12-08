---
title : "Serialize and Deserialize Binary Tree"
date : "2018-12-03"
category: "자료구조"
---

링크: https://leetcode.com/problems/serialize-and-deserialize-binary-tree/

* 트리를 string 데이터 타입으로 serialize로 하고, seralized된 string을 트리로 deserialize해야 한다.



#### **1. Deserialize**

> string tree = "5,4,8,11,null,13,4,7,2,null,null,5,1";

위와 같은 string이 주어졌을 때 deserialize 하는 방법은 DFS (Depth First Search) 접근과 BFS(Breath First Search) 접근을 이용할 수 있다. 전자는 stack 혹은 recursive를 후자는 queue를 이용할 것이다.



다음은 bfs 접근을 이용한 deserialize를 하는 코드이다.

```cpp
#include <string>
#include <sstream>
#include <queue>

using namespace std;

//트리노드 클래스
class TreeNode{
    public:
    TreeNode *left;
    TreeNode *right;
    int value;
    TreeNode(int v) : left(NULL), right(NULL), value(v) {}
};

//string 을 파싱하여 노드로 바꾸는 함수
TreeNode *stringToNode(stringstream& ss)
{
    string str;
    getline(ss,str,',');
    if(str == "null") return NULL;
    if(str.empty()) return NULL;
}

TreeNode *deserialize(string& s)
{
    stringstream ss(s);
    TreeNode *root = stringToNode(ss);
    //root가 null이면 null 리턴 후 함수 종료
    if(root == nullptr)
        return NULL;
    
    // 노드  - 왼쪽 차일드 - 오른쪽 차일드 순서로 차례로 만들어 넣기 위해 queue가 필요하다.
    queue<TreeNode*> q;
    q.push(root);
    
    while(!q.empty())
    {
        auto top = q.front();
        top->left = stringToNode(ss);
        if(top->left !=nullptr)
        {
            q.push(top->left);
        }
        top->right = stringToNode(ss);
        if(top->right != nullptr)
        {
            q.push(top->right);
        }
        q.pop();
    }
    return root;
    
}

```

```cpp
int main()
{
    string tree = "5,4,8,11,null,13,4,7,2,null,null,5,1";
    deserialize(tree);
}
```

------

>  ┌────────────┐
>
>  │ **이를 응용한 문제**   │
>
>  └────────────┘

------

직렬화된 형식으로 변환된 이진트리가 입력으로 주어질 때 루트(root)노드로부터 단말(leaf)노드까지 존재하는 경로들 내의 노드들의 합이 입력으로 주어진 숫자와 같은 모든 경로의 개수를 구하는 코드를 작성하시오.

### 입출력 예

예:

- 입력: 5,4,8,11,null,13,4,7,2,null,null,5,1, 22 (목표값)
- 출력: 2

------



 루트 노드로부터 단말 노드까지의 합을 계산 할 수 있는 메소드를 만든다.

각각의 합들을 저장하기 위해 Map을 이용하기로 했다.

```cpp
void nodesHap ( TreeNode* T, int currentSum, map<int,int>& m)
{
    //inorder traversal의 알고리즘을 이용한다.
    if(T == nullptr)
		return;
    
    currentSUm + = T->value;
    if(T->left == nullptr && root->right == nullptr) //terminal node라면
    {
        //만약 해당 경로의 합과 같은 경우가 있었다면 카운트를 올려주고, 그렇지 않다면 새로 추가한다.
        if(m.find(currentSum) == m.end())
            m[currentSum] = 1;
        else
            m[currentSum]++;
    }
    nodesHap(T->left, currentSum, m);
    nodesHap(T->right, currentSum, m);
}
```

```cpp
int main()
{
    int answer = 0; int target = 22; 
    map<int,int> m;
    
    string tree = "5,4,8,11,null,13,4,7,2,null,null,5,1";
    nodesHap(deserialize(tree), 0, m);
    
    if(m.find(target) != m.end())
        answer = m[traget];
}
```

------

------



### 문제 개요

'균형 잡힌 이진트리(Balanced Binary Tree)'란 각 노드가 갖고 있는 하위트리(sub-tree)의 높이 차이가 1 이하인 이진트리를 말합니다. 본 문제는 주어진 트리가 균형 잡힌 이진트리인지 판별하는 함수를 작성하는 것이 목표입니다.

### 입출력 예

- 입력: 직렬화된 트리를 나타내는 배열 T
- 출력: 입력 T가 균형 잡힌 이진트리이면 true를 리턴, 아니면 false를 리턴하시오.

------



1. 높이를 구하는 메소드
2. 높이를 통해 balanced 인지 판단하는 메소드

가 필요하다.



```cpp
int getHeight(TreeNode *T)
{
    if(T == nullptr)
        return 0;
    
    return max(getHeight(T->left), getHeight(T->right)) + 1;
}
```

```cpp
bool isBalanced(TreeNode *T)
{
    if(T == nullptr)
        return true;
    
    int lh= getHeight(T->left);
    int rh= getHeight(T->right);
    
    if(abs(lh-rh)<=1 && isBalanced(T->left) && isBalanced(T->right))
        return true;
    
    return false;
}
```





keywords: **Binary Tree, deserialize, queue** 