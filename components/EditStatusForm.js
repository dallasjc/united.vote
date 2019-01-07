const Component = require('./Component')

module.exports = class EditLegislationForm extends Component {
  onkeyup(event) {
    this.setProps({ [event.target.getAttribute('name')]: event.target.value }).render()
  }
  onchange(event) {
    this.setProps({ [event.target.getAttribute('name')]: event.target.value }).render()
  }
  onsubmit(event, form) {
    event.preventDefault()

    const { updating_status, loading } = this.state

    if (!loading) {
      if (updating_status.id) {
        return this.updateLegislation(event, form)
      }
      return this.insertLegislation(event, form)
    }
  }
  insertLegislation(event, form) {

    this.setState({ loading: 'saving' })

    return this.api('/measures', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify({
        status: form.status,
      })
    })
    .then((bills) => {
      event.target.reset()

      const proposed_bill = bills[0]

      this.setState({
        updating_status: {},
        loading: false,
        yourLegislation: [proposed_bill].concat(this.state.yourLegislation || []),
      })
    })
    .then(() => this.location.redirect(303, `/legislation/yours`))
    .catch((api_error) => this.handleError(api_error))
  }
  updateLegislation(event, form) {
    const { updating_status, user } = this.state

    this.setState({ loading: 'saving' })

    return this.api(`/measures?id=eq.${updating_status.id}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(form),
    })
    .then((bills) => {
      const bill = bills[0]
      this.setState({
        loading: false,
        yourLegislation: (this.state.yourLegislation || []).map((old) => (old.id === updating_status.id ? bill : old)),
      })
      this.location.redirect(303, `/${user.username}/legislation/${bill.short_id}`)
    })
    .catch((api_error) => this.handleError(api_error))
  }
  handleError(api_error) {
    let ui_error
    switch (api_error.message) {
      case 'new row for relation "measures" violates check constraint "short_id_length"':
        ui_error = 'URL ID must be between 2 and 32 characters.'
        break
      case 'duplicate key value violates unique constraint "legislation_unique"':
        ui_error = 'There is already a bill with this title. Please choose another.'
        break
      default:
        console.log(api_error)
        this.setState({ isContactWidgetVisible: true })
        ui_error = 'An error on our end occurred. Please contact support.'
    }
    this.setState({ loading: false, error: ui_error })
  }
  render() {
    const { updating_status = {}, error, loading } = this.state
    const { status } = updating_status


    return this.html`
      <form method="POST" onsubmit=${this} action=${this}>
        ${error ? [`<div class="notification is-danger">${error}</div>`] : ''}
        <div class="field">
          <label for="Title" class="label has-text-grey">Status</label>
          <div class="control">
            <input name="status" class="input" type="text" autocomplete="off" placeholder="${status}" onkeyup=${this} onchange=${this} required value="${status || ''}" />
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class=${`button is-primary ${loading === 'saving' ? 'is-loading' : ''}`} disabled="${loading}" type="submit">
              <span class="icon"><i class="fa fa-edit"></i></span>
              <span>Save</span>
            </button>
          </div>
        </div>
        </form>
    `
  }
}
