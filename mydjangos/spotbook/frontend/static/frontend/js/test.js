import TestComponent from "./components/TestComponent.js";

var args = {
    targetDiv: 'test-div',

}

var obj = new TestComponent(args);
obj.renderDiv();