// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../Packages/Beckhoff.TwinCAT.HMI.Framework.14.2.110/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    // If you want to unregister an event outside the event code you need to use the return value of the method register()
    let destroyOnInitialized = TcHmi.EventProvider.register('onInitialized', (e, data) => {
        // This event will be raised only once, so we can free resources. 
        // It's best practice to use destroy function of the event object within the callback function to avoid conflicts.
        e.destroy();
        // ----------------------
        // Place your code here!
        // ----------------------
        let variableSomething = false

        // TwinCAT HMI textbox element의 구조 모양
        const textBoxHMI = document.getElementById('TcHmiTextbox_1').childNodes[0].childNodes[1].childNodes[1].childNodes[0]

        textBoxHMI.addEventListener('blur', () => {
            if (variableSomething)
                textBoxHMI.focus()
        })

        const symbol = new TcHmi.Symbol('%s%ADS.PLC1.MAIN.bInitTest%/s%');
        symbol.watch(function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                variableSomething = data.value

                if (variableSomething)
                    textBoxHMI.focus()
                else
                    textBoxHMI.blur()
            }
        });
    });
})(TcHmi);