export default class BetterMutationObserver extends MutationObserver {
  target: Node | Array<Node> | NodeList
  options: MutationObserverInit

  constructor(
    target: Node | Array<Node> | NodeList,
    options: MutationObserverInit,
    callback: MutationCallback
  ) {
    super(callback)
    this.target = target
    this.options = options
  }

  public observe(): void {
    if (this.target instanceof Node) {
      this.observeNode(this.target)
    } else {
      this.target.forEach(this.observeNode)
    }
  }

  private observeNode(node: Node): void {
    super.observe(node, this.options)
  }
}
