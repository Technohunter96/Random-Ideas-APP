import IdeasApi from "../services/ideasApi"

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector("#idea-list")
    this._ideas = []
    this.getIdeas()

    this._validTags = new Set([
      // css classes for particular tags
      "technology",
      "software",
      "business",
      "education",
      "health",
      "inventions",
    ])
  }

  addEventListeners() {
    this._ideaListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation()
        const ideaId = e.target.parentElement.parentElement.dataset.id // to get data-id=${idea._id} from particular card
        this.deleteIdea(ideaId)
      }
    })
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas() // getIdeas() is method within class IdeaApi
      this._ideas = res.data.data // in BE routes - { success: true, data: ideas }, thats why data.data
      this.render() // rendering data
    } catch (error) {
      console.log(error)
    }
  }

  async deleteIdea(ideaId) {
    try {
      // Delete from server
      const res = await IdeasApi.deleteIdea(ideaId)
      this._ideas.filter((idea) => idea._id !== ideaId)
      this.getIdeas()
    } catch (error) {
      alert("You can not delete this resource")
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea)
    this.render()
  }

  getTagClass(tag) {
    tag = tag.toLowerCase()
    let tagClass = ""
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`
    } else {
      tagClass = ""
    }

    return tagClass
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag)
        const deleteBtn =
          idea.username === localStorage.getItem("username")
            ? '<button class="delete"><i class="fas fa-times"></i></button>'
            : ""
        return `
        <div class="card" data-id=${idea._id}>
        ${deleteBtn}
        <h3>
          ${idea.text}
        </h3>
        <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
        <p>
          Posted on <span class="date">${idea.date}</span> by
          <span class="author">${idea.username}</span>
        </p>
      </div>
               `
      })
      .join("")
    this.addEventListeners()
  }
}

export default IdeaList
