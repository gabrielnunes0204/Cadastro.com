/* eslint-disable */

//VARIÁVEIS PARA FECHAR O TÓPICO DOS DADOS TABELA QUANDO OS DADOS FOREM APAGADOS
const tr = document.querySelectorAll(".tr");
const arrayTR = Array.from(tr);

//MENU RESPONSIVO
function apareceMenu() {
  const iconeMenu = document.querySelector(".botao-menu");
  const itemBotaoMenu = document.querySelector(".menu-oculto");
  const cssitemBotao = getComputedStyle(itemBotaoMenu);

  iconeMenu.addEventListener("click", (event) => {
    event.preventDefault();

    if (cssitemBotao.display === "none") {
      itemBotaoMenu.style.display = "block";
      iconeMenu.innerHTML = "&#10008;";
    } else if (cssitemBotao.display === "block") {
      itemBotaoMenu.style.display = "none";
      iconeMenu.innerHTML = "&#9776;";
    }
  });

  window.addEventListener("mousemove", () => {
    if (window.innerWidth > 960) {
      itemBotaoMenu.style.display = "none";
      iconeMenu.innerHTML = "&#9776;";
    }
  });
}
apareceMenu();

//ABRE E FECHA MODAL, ADICIONA CLASSES A ELE, VALIDA OS INPUTS DO MODAL
function validarModal() {
  const botaoModal = document.querySelector(".botao-modal");
  const botaoFechar = document.querySelector("#botao-fechar");
  const botaoSalvar = document.querySelector("#botao-salvar");
  const iconeFecharModal = document.querySelector("#icone-fechar");

  const modal = document.querySelector(".modal");
  const body = document.querySelector("body");

  const inputs = document.querySelectorAll(".input");
  const arrayInputs = Array.from(inputs);
  const popupErro = document.querySelector(".popup-erro");
  const popupCadastado = document.querySelector(".popup-cadastrado");
  const footer = document.querySelector(".footer");

  //ABRIR MODAL
  botaoModal.addEventListener("click", () => {
    modal.style.display = "block";
    modal.style.visibility = "visible";
    modal.classList.add("modalAtivo");
    body.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    if (modal.className === "modal modalAtivo") {
      body.style.background = "rgba(0,0,0,.2)";
      arrayInputs.forEach((itemBotao) => {
        itemBotao.value = "";
      })
    } else {
      console.log('');
    }
  });

  //FECHAR MODAL
  botaoFechar.addEventListener("click", () => {
    modal.style.display = "none";
    body.style.background = "#fff";
  });

  //ÍCONE PARA FECHAR O MODAL
  iconeFecharModal.addEventListener("click", (event) => {
    event.preventDefault();
    modal.style.display = "none";
    body.style.background = "#fff";
  });

  //REGEX CPF
  function regexCPF() {
    arrayInputs[2].addEventListener("change", () => {
      const cpf = arrayInputs[2].value;
      const novoCPF = cpf.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/g,
        "$1.$2.$3-$4"
      );
      arrayInputs[2].value = novoCPF;
    });
  }
  regexCPF();

  //SALVAR DADOS DO MODAL
  botaoSalvar.addEventListener("click", () => {
    if (arrayInputs[0].value === "") {
      popupErro.style.display = "inline-block";
      popupErro.innerHTML = `Corrija o campo nome <span>&#9660;</span>`;
      setTimeout(() => {
        popupErro.style.display = "none";
      }, 2500);
      body.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (
      arrayInputs[1].value === "" ||
      !arrayInputs[1].value.includes("@") ||
      !arrayInputs[1].value.includes(".com")
    ) {
      popupErro.style.display = "inline-block";
      popupErro.innerHTML = `Corrija o campo e-mail <span>&#9660;</span>`;
      setTimeout(() => {
        popupErro.style.display = "none";
      }, 2500);
      body.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (
      arrayInputs[2].value === "" ||
      arrayInputs[2].value.length < 11 ||
      arrayInputs[2].value.length > 14
    ) {
      popupErro.style.display = "inline-block";
      popupErro.innerHTML = `Corrija o campo CPF <span>&#9660;</span>`;
      setTimeout(() => {
        popupErro.style.display = "none";
      }, 2500);
      body.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (arrayInputs[3].value === "") {
      popupErro.style.display = "inline-block";
      popupErro.innerHTML = `Corrija o campo data de nascimento <span>&#9660;</span>`;
      setTimeout(() => {
        popupErro.style.display = "none";
      }, 2500);
      body.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      popupCadastado.style.display = "inline-block";
      setTimeout(() => {
        popupCadastado.style.display = "none";
        modal.style.display = "none";
      }, 1500);
      body.style.background = "#fff";
      body.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      arrayTR.length++;
      if (arrayTR.length > 3) {
        footer.style.position = "relative";
      }

      //MOSTRANDO OS DADOS DO MODAL
      function mostrarTabela() {
        const dados = document.querySelector(".dados");
        dados.style.display = "block";
        const tabela = document.querySelector(".dados table");

        //MODIFICANDO O FORMATO DA DATA
        const data = document.querySelector("#data");
        const date = data.value;
        const novaData = date.replace(
          /(\d{4})[-](\d{2})[-](\d{2})/g,
          "$3/$2/$1"
        );
        data.value = novaData;

        tabela.innerHTML += `
                <tr class="tr">
                    <td> ${arrayInputs[0].value} </td>
                    <td> ${arrayInputs[1].value} </td>
                    <td> ${novaData} </td>
                    <td class="botao-tabela">
                        <button class="btn-excluir" id="botao-excluir"> Excluir </button>
                    </td>
                </tr>`;
      }
      mostrarTabela();
    }

    //EXCLUINDO OS DADOS DA TABELA
    function excluirDados() {
      const botoes = document.querySelectorAll(".btn-excluir");
      const arrayBotoes = Array.from(botoes);

      const dados = document.querySelector(".dados");

      arrayBotoes.forEach((item) => {
        item.addEventListener("click", () => {
          item.parentNode.parentNode.style.display = "none";
          arrayTR.length--;

          if (arrayTR.length === 0) {
            dados.style.display = "none";
          };
        });
      });
    }
    excluirDados();
  });
}
validarModal();

//CLIQUE FORA E ESC DO MODAL
function cliqueFora() {
  const modal = document.querySelector(".modal");
  const body = document.querySelector("body");

  window.addEventListener("click", (event) => {
    if (
      event.target.className == "div-botao" ||
      event.target.className == "container" ||
      event.target.className == "body" ||
      event.target.className == "div-logo" ||
      event.target.className == "div-btn" ||
      event.target.className == "nav"
    ) {
      modal.style.display = "none";
      body.style.background = "#fff";
    }
  });

  //ESC PARA FECHAR O MODAL
  window.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
      modal.style.display = "none";
      body.style.background = "#fff";
    }
  });
}
cliqueFora();

//POPUP QUE MOSTRA A QUANTIDADE DE USUÁRIOS
function contarUsuarios() {
  const botao = document.querySelector("#usuario");
  const popup = document.querySelector(".popup-usuarios");
  const valorUser = document.querySelector(".numeroUsuarios");

  botao.addEventListener("click", (event) => {
    event.preventDefault();
    popup.style.display = "block";

    setTimeout(() => {
      popup.style.display = "none";
    }, 2000);
    valorUser.innerHTML = arrayTR.length;
  });
}
contarUsuarios();

//POPUP QUE MOSTRA O CONTATO
function mostrarContato() {
  const botao = document.querySelector("#contato");
  const popup = document.querySelector(".popup-contato");

  botao.addEventListener("click", (event) => {
    event.preventDefault();
    popup.style.display = "block";

    setTimeout(() => {
      popup.style.display = "none";
    }, 2000);
  });
}
mostrarContato();
