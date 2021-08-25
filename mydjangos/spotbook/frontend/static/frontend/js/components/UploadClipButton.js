export default class UploadClipButton {

    // GETTERS
    getUploadClipButtonDiv() {
        var result = this.buildUploadClipButton();
        return result;
    }

    // METHODS
    onClickMethod() {
        window.location.href = "http://127.0.0.1:8000/spotbook/upload-clip/";
    }


    // BUILDERS
    buildUploadClipButton() {
        var div = document.createElement('div');
        div.id = 'upload-clip-button-div';

        var button = document.createElement('button');
        button.innerHTML = 'Upload Clip';
        button.addEventListener("click", this.onClickMethod);

        div.appendChild(button);

        return div;
    }

    // RENDERERS
    render(target_div) {
        var div = this.getUploadClipButtonDiv();
        var targetDiv = document.getElementById(target_div);
        targetDiv.appendChild(div);
    }

}