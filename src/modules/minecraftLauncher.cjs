const { Client, Authenticator } = require('minecraft-launcher-core');
const LocateJavaHome = require('locate-java-home').default;
const path = require('path');
const {ipcMain} = require('electron')
async function launchMinecraft() {
  const launcher = new Client();

  // Locate the Java Home
  LocateJavaHome({
    version: "=1.8", // Find Java 8
    mustBeJDK: true
  }, async function(error, javaHomes) {
    if (error) {
      console.error('Failed to locate Java Home:', error);
      return;
    }

    // Log the found Java Homes
    console.log('Java Homes:', javaHomes);

    if (javaHomes.length === 0) {
      console.error('No suitable Java version found.');
      return;
    }

    // Assume the first matching Java home is the one we want
    const javaPath = javaHomes[0].executables.java;
    console.log('Using Java path:', javaPath);

    // Launch options
    const opts = {
      authorization: await Authenticator.getAuth("Cenaure"),
      root: path.resolve('./minecraft'),
      version: {
        number: "1.12.2",
        type: "release"
      },
      memory: {
        max: "6G",
        min: "4G"
      },
      forge: path.resolve(__dirname, "forge-1.12.2-14.23.5.2859-installer.jar"),
      extraModDirectories: path.resolve(__dirname, './mods'),
      javaPath: javaPath // Use the located Java path
    };

    launcher.launch(opts);

    launcher.on('progress', (status) => {
      //console.log(`Progress: ${status.task} / ${status.total}`);
      ipcMain.emit('progress-update', status);
    });

    /*
    launcher.on('download', (download) => {
      console.log(`Downloading: ${download.task} - ${download.progress}%`);
      // Update your download progress bar here
    });
    */

    launcher.on('debug', (e) => console.log(e));
    launcher.on('data', (e) => {
      ipcMain.emit('hide')
      console.log("data: " + e)
    });

    launcher.on('close', (number) => {
      ipcMain.emit('show')
      console.log("Minecraft closed with code: " + number)
    });
    return 'Minecraft launch initiated';
  });
}

module.exports = { launchMinecraft };
