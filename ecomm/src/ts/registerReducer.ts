export const ACTIONS = {
  username_focus : 'username-focus',
  email_focus : 'email-focus',
  password_focus : 'password-focus',
  confirm_focus : 'confirm-focus',
  all_false: 'all-false'
}

interface State {
  userFocus: boolean,
  emailFocus: boolean,
  passwordFocus: boolean,
  confirmFocus: boolean,
}

type Actions = {
  type: string
}

export const controls = {
  userFocus: false,
  emailFocus: false,
  passwordFocus: false,
  confirmFocus: false,
}

export function registerReduce(state : State , action: Actions){
  switch (action.type) {
    case ACTIONS.username_focus : {
      return {
        userFocus: true,
        emailFocus: false,
        passwordFocus: false,
        confirmFocus: false,
      }
    }
    case ACTIONS.email_focus : {
      return {
        userFocus: false,
        emailFocus: true,
        passwordFocus: false,
        confirmFocus: false,
      }
    } 
    case ACTIONS.password_focus : {
      return {
        userFocus: false,
        emailFocus: false,
        passwordFocus: true,
        confirmFocus: false,
      }
    }
    case ACTIONS.confirm_focus : {
      return {
        userFocus: false,
        emailFocus: false,
        passwordFocus: false,
        confirmFocus: true,
      }
    }
    case ACTIONS.all_false : {
      return {
        userFocus: false,
        emailFocus: false,
        passwordFocus: false,
        confirmFocus: false,
      }      
    }
    default:{
      return state;
    }
  }
}