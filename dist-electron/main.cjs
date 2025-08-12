"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
function createWindow() {
    const win = new electron_1.BrowserWindow({
        width: 800, height: 600,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.cjs') // nếu dùng preload
        }
    });
    // Với dev server Vite mặc định 5173, đổi nếu bạn chỉnh port khác
    win.loadURL('http://localhost:5173');
}
electron_1.app.whenReady().then(createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
//# sourceMappingURL=main.js.map