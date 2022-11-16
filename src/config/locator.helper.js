module.exports = {
    page: {
      login: {
        selectors: {
          login: 'input[name=username]',
          password: 'input[name=password]',
          loginBtn: 'button[type=button].is-primary',
          message: 'div[class=message danger]',
          view: 'button[type=button].v-popper--has-tooltip',
          eyesHide: 'button[aria-label=Show the password]',
          eyesShow: 'button[aria-labe=Hide the password]',
          forgotPass: 'a[class=reset-password-link]',
          createAccount: 'a[href="/register"]' ,
          checkboxStayLog: 'input[class=mr-1]',
          addTask: 'textarea[class="add-task-textarea input textarea-empty"]',
          AddButton: 'button[class="base-button base-button--type-button button is-primary add-task-button"]',
          TaskList: 'div[class="tasks mt-0"]',
          AnyTaskChekbox: 'div[class="fancycheckbox"]',
          AnyTask: 'div[class="task loader-container"]',
          UnMarkTask: 'button[class="base-button base-button--type-button favorite"]',
          MarkTask: 'button[class="base-button base-button--type-button is-favorite favorite"]',
          EditTask: 'button[class="base-button base-button--type-button icon settings"]',
        }
      }
    }
  }
  