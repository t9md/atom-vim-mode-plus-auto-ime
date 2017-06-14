'use babel'
import child_process from 'child_process'
import { CompositeDisposable } from 'atom'

export default {
  config: {
    insert: {
      type: 'string',
      default: '',
    },
    normal: {
      type: 'string',
      default: '',
    },
    visual: {
      type: 'string',
      default: '',
    },
  },

  activate() {},

  deactivate() {
  },

  consumeVim({ observeVimStates }) {
    observeVimStates(vimState => {
      vimState.modeManager.onDidActivateMode(({ mode })=>{
        const cmd = atom.config.get('vim-mode-plus-auto-ime')[mode]
        if(cmd && cmd.length) child_process.execSync(cmd)
      })
    })
  }
}
