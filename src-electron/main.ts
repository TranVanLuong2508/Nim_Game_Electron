import { app, BrowserWindow } from 'electron';
import path from 'path';
function createWindow() {
    const win = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js') // nếu dùng preload
        }
    });
    // Với dev server Vite mặc định 5173, đổi nếu bạn chỉnh port khác
    win.loadURL('http://localhost:5173');
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});