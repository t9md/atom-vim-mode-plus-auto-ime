const {execSync} = require("child_process")
module.exports = {
  activate() {
    atom.config.observe("vim-mode-plus-auto-ime.commandOnActivateInsertMode", value => {
      this.commandOnActivateInsertMode = value
    })
    atom.config.observe("vim-mode-plus-auto-ime.commandToGetCurrentInputSource", value => {
      this.commandToGetCurrentInputSource = value
    })
    atom.config.observe("vim-mode-plus-auto-ime.commandOnDeactivateInsertMode", value => {
      this.commandOnDeactivateInsertMode = value
    })
  },

  consumeVim({observeVimStates}) {
    observeVimStates(vimState => {
      vimState.modeManager.onDidActivateMode(({mode}) => {
        if (mode === "insert" && this.insertModeInputSource) {
          execSync(this.commandOnActivateInsertMode.replace("${source}", this.insertModeInputSource))
        }
      })

      vimState.modeManager.onDidDeactivateMode(({mode}) => {
        if (mode === "insert") {
          // Preserve IME state to restore on next insert-mode
          this.insertModeInputSource = execSync(this.commandToGetCurrentInputSource).toString()
          execSync(this.commandOnDeactivateInsertMode)
        }
      })
    })
  },
}
