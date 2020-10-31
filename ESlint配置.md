npm i eslint eslint-plugin-import eslint-config-airbnb-base babel-eslint eslint-plugin-jsx-a11y eslint-plugin-react -D
npx eslint --init


module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "mocha": true,
    },
    "extends": "airbnb-base",
    "parserOptions": {
        "ecmaVersion": 8 // or 2017
    },
    "root": true,
    "rules": {
        "no-tabs": 0,
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};



{
    "window.zoomLevel": 2,
    "explorer.confirmDelete": false,
    "diffEditor.ignoreTrimWhitespace": true,
    "workbench.colorTheme": "Ayu One",
    "diffEditor.renderSideBySide": false,
    "explorer.confirmDragAndDrop": false,
    "C_Cpp.updateChannel": "Insiders",
    "editor.detectIndentation": false,
    "editor.insertSpaces": false,
    "eslint.runtime": "",
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "workbench.statusBar.visible": true,
    "editor.renderControlCharacters": false,
    "eslint.codeAction.showDocumentation": {
        "enable": true
    },
	"workbench.sideBar.location": "left",
	"notebook.kernelProviderAssociations": [
	],
}



