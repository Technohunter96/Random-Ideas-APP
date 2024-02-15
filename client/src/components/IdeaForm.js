import IdeasApi from "../services/ideasApi"
import IdeaList from "./IdeaList"

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector("#form-modal")
    this._ideaList = new IdeaList()
  }

  addEventListeners() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this))
  }

  async handleSubmit(e) {
    e.preventDefault()

    const idea = {
      text: this._form.elements.text.value, // name="text" in form
      tag: this._form.elements.tag.value, // name="tag" in form
      username: this._form.elements.username.value, // name="username" in form
    }

    // Add idea to server
    const newIdea = await IdeasApi.createIdea(idea)

    // Add idea to list
    this._ideaList.addIdeaToList(newIdea.data.data)

    // Clear fields after submit
    this._form.elements.text.value = ""
    this._form.elements.tag.value = ""
    this._form.elements.username.value = ""

    document.dispatchEvent(new Event("closemodal")) // in Modal.js added event listener with close on it, dispatched on submit of form
  }

  render() {
    this._formModal.innerHTML = `
    <form id="idea-form">
    <button class="delete" id="#close-modal"><i class="fas fa-times"></i></button>
    <div class="form-control">
      <label for="idea-text">Enter a Username</label>
      <input type="text" name="username" id="username" />
    </div>
    <div class="form-control">
      <label for="idea-text">What's Your Idea?</label>
      <textarea name="text" id="idea-text"></textarea>
    </div>
    <div class="form-control">
      <label for="tag">Tag</label>
      <select name="tag" id="tag">
      <option value="" disabled selected hidden>Please select a tag</option>
      <option value="technology">Technology</option>
      <option value="software">Software</option>
      <option value="business">Business</option>
      <option value="education">Education</option>
      <option value="health">Health</option>
      <option value="inventions">Inventions</option>
      <option value="others">Other</option>
    </select>
    </div>
    <button class="btn" type="submit" id="submit">Submit</button>
  </form>
    `
    this._form = document.querySelector("#idea-form") // had to move it under the formModal bcs #idea-form
    this.addEventListeners()
  }
}

export default IdeaForm
