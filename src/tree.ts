class TreeNode<K, T> {
    private _key: K;
    private _data: T;
    private _left: TreeNode<K, T> | null;
    private _right: TreeNode<K, T> | null;

    constructor(key: K, data: T, left: TreeNode<K, T> | null, right: TreeNode<K, T> | null) {
        this._key = key;
        this._data = data;
        this._left = left;
        this._right = right;
    }

    get key(): K {
        return this._key;
    }

    set key(value: K) {
        this._key = value;
    }

    get data(): T {
        return this._data;
    }

    set data(value: T) {
        this._data = value;
    }

    get left(): TreeNode<K, T> | null {
        return this._left;
    }

    set left(value: TreeNode<K, T> | null) {
        this._left = value;
    }

    get right(): TreeNode<K, T> | null {
        return this._right;
    }

    set right(value: TreeNode<K, T> | null) {
        this._right = value;
    }
}

export class Tree<K, T> {
    private root: TreeNode<K, T> | null;
    private _size: number;

    constructor() {
        this.root = null;
        this._size  = 0;
    }

    get size(): number {
        return this._size;
    }

    insert(key: K, data: T) {
        let newNode = new TreeNode(key, data, null, null);

        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode); // helper method below
        }
    }

    get(key: K, node: TreeNode<K, T> | null = this.root): T | null{
        if (node != null) {
            if (key < node.key) {
                return this.get(key, node.left);
            } else if (key > node.key) {
                return this.get(key, node.right);
            } else {
                return node.data;
            }
        }
        return null;
    }

    search(key: K, node: TreeNode<K, T> | null): TreeNode<K, T> | null {
        if (node === null) {
            return null;
        } else if (key < node.key) {
            return this.search(key, node.left);
        } else if (key > node.key) {
            return this.search(key, node.right);
        } else {
            return node;
        }
    }

    toString(): void{
        this.inOrderTraverse(this.root);
    }

    insertNode(node: TreeNode<K, T>, newNode: TreeNode<K, T>) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    inOrderTraverse(node: TreeNode<K, T> | null) {
        if (node != null) {
            this.inOrderTraverse(node.left);
            this.callback(node.key, node.data);
            this.inOrderTraverse(node.right);
        }
    }

    callback(key: K, data: T){
        console.log('[' + key + '] ' + data + ', ')
    }

    remove(key: K) {
        this.root = this.removeNode(this.root, key); // helper method below
    }

    // находит минимальный узел в дереве
    minNode(node: TreeNode<K, T>): TreeNode<K, T> {
        // если слева от узла ноль тогда это должен быть минимальный узел
        if (node.left === null)
            return node;
        else
            return this.minNode(node.left);
    }

    removeNode(node: TreeNode<K, T> | null, key: K) {
        if (node === null) {
            return null;
            // если данные, которые нужно удалить, меньше, чем данные корня, переходим к левому поддереву
        } else if (key < node.key) {
            node.left = this.removeNode(node.left, key);
            return node;
            // если данные, которые нужно удалить, больше, чем данные корня, переходим к правому поддереву
        } else if (key > node.key) {
            node.right = this.removeNode(node.right, key);
            return node;
            // если данные такие как данные корня, удаляем узел
        } else {
            // удаляем узел без потомков (листовой узел (leaf) или крайний)
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }

            // удаляем узел с одним потомком
            if (node.left === null) {
                node = node.right;
                return node;
            } else if(node.right === null) {
                node = node.left;
                return node;
            }

            // удаляем узел с двумя потомками
            // minNode правого поддерева хранится в новом узле
            let newNode = this.minNode(node.right);
            node.key = newNode.key;
            node.data = newNode.data;
            node.right = this.removeNode(node.right, newNode.key);
            return node;
        }
    }
}
