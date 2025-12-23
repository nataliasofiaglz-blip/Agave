export class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = {};
        this.element = null;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.update();
    }

    render() {
        return '<div></div>';
    }

    mount(parent) {
        this.parent = parent;
        this.update();
        this.onMount();
    }

    update() {
        if (!this.parent) return;

        // Simple re-render strategy (efficient enough for this scale)
        this.parent.innerHTML = this.render();
        this.addEventListeners();
    }

    addEventListeners() {
        // To be implemented by subclasses
        // Example: document.querySelector('#btn').addEventListener(...)
    }

    onMount() { }
}
