'use babel'
import child_process from 'child_process'
import { CompositeDisposable } from 'atom'

export default {
  config: {
    customCommand: {
      type: 'string',
      default: '',
      description: 'automatically change ime with this custom command when vim mode changes'
    },
  },

  activate() {},

  deactivate() {
  },

  consumeVim({ observeVimStates }) {
    observeVimStates(vimState => {
      vimState.modeManager.onDidActivateMode(({ mode })=>{
        if (mode !== 'insert') {
          const cmd = atom.config.get('vim-mode-plus-auto-ime.customCommand')
          if (cmd.length !== 0) {
            child_process.execSync(cmd)
          }
        }
      })
    })
  }
}
