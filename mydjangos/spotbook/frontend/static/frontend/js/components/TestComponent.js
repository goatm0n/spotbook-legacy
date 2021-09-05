

// Component with virutal dom, click to increase number on button
export default class TestComponent {
    constructor(args) {
        this.args = args;
    }


    renderDiv() {
        var div = document.createElement('div');
        div.id = 'test-component-div';

        var targetDiv = document.getElementById(this.args.targetDiv);
        
        targetDiv.appendChild(div);
        
    }

    renderVirtualDiv() {
        var vDiv = document.createElement('div');
        vDiv.id = 'virtual-test-component-div';
    }

    

}
