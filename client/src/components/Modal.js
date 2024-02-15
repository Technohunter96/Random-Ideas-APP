class Modal {
  constructor() {
    this._modal = document.querySelector("#modal")
    this._modalBtn = document.querySelector("#modal-btn")
    this._closeModalBtn = document.querySelector("#close-modal")
    this.addEventListeners()
  }

  addEventListeners() {
    this._modalBtn.addEventListener("click", this.open.bind(this))
    this._closeModalBtn.addEventListener("click", this.close.bind(this))
    window.addEventListener("click", this.outsideClick.bind(this)) // pokud je target modal a ne modal-box, tak se to spustí, tzn. když kliknu mimo modal box, tak modal - display: "none"
    document.addEventListener("closemodal", () => this.close())
  }

  open() {
    this._modal.style.display = "block"
  }

  close() {
    this._modal.style.display = "none"
  }

  outsideClick(e) {
    if (e.target === this._modal) {
      this.close()
    }
  }
}

export default Modal
