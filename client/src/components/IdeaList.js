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

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas() // getIdeas() is method within class IdeaApi
      this._ideas = res.data.data // in BE routes - { success: true, data: ideas }, thats why data.data
      this.render() // rendering data
    } catch (error) {
      console.log(error)
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
        return `
        <div class="card">
        <button class="delete"><i class="fas fa-times"></i></button>
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
  }
}

export default IdeaList
