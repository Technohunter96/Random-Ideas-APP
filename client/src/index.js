import "./css/style.css"
import Modal from "./components/Modal"
import IdeaForm from "./components/IdeaForm"
import IdeaList from "./components/IdeaList"
import "@fortawesome/fontawesome-free/css/all.css"

new Modal()
const ideaForm = new IdeaForm()
ideaForm.render()
new IdeaList()
// ideaList.render() // we are rendering it before getting the data, so we moved this.render() inside the getIdea() method within class IdeaList
