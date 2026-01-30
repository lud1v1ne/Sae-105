document.addEventListener('DOMContentLoaded', function () {
    let container = document.querySelector(".liste-imgs");
    let html = '<div class="fixed-parallax">';

    //la partie qui suit a été faite à l'aide de video de Code Mutation sur YTB
    data.forEach((item, index) => {
        let imageClass = index === 0 ? "one" : index === 1 ? "two" : index === 2 ? "three" : index === 3 ? "four" : index === 4;//parcours les data, les index sont sa positio pour attribuer la bonne photo
        html += `
            <section class="image ${imageClass} image-cliquable" style="background-image: url('${item.urlImage}')">
                <h2 class="${item.titreClass}">${item.titre}</h2>
            </section>
            <section class="${item.texteClass}">
                <p class="descImg">${item.descImg}</p>
                <p class="textWhyThisPic">${item.textWhyThisPic}</p>
               <p class="srcImage">${item.srcImage}</p>
            </section>
        `;
        // le $ sert comme de x dans une équation, donc je lui attribue une valeu ici
        // aide :https://youtu.be/k2I_-0My-H8?si=Y8tGmYY1jWMwR0_X
    });

    html += "</div>";
    container.innerHTML = html;

    //  PREVIEW DU FORMULAIRE (Q3-Q5)
    let champTitre = document.querySelector("#titre");
    let champDescription = document.querySelector("#description");
    let champURL = document.querySelector("#url");

    // Éléments d'aperçu
    let previewTitre = document.querySelector(".preview-titre");
    let previewDescription = document.querySelector(".preview-description");
    let previewImage = document.querySelector(".preview-image");

    // Preview titre 
    champTitre.addEventListener("keyup", function () {
        previewTitre.textContent = champTitre.value;
    });

    // Preview description
    champDescription.addEventListener("keyup", function () {
        previewDescription.textContent = champDescription.value;
    });

    // Preview image URL 
    champURL.addEventListener("keyup", function () {
        previewImage.src = champURL.value;
    });

    // Bouton envoi
let boutonEnvoyer = document.querySelector("#envoyer");
boutonEnvoyer.addEventListener("click", function (event) {
    // Récupération des champs
    let champTitre = document.querySelector("#titre");
    let champDescription = document.querySelector("#description");
    let champURL = document.querySelector("#url");
    
    // Construction du message avec données formulaire (Q10)
    let message = "Titre: " + champTitre.value + 
                  " Desc: " + champDescription.value + 
                  " URL: " + champURL.value;

    // URL de l'API a
    let urlVisitee = "https://gambette.butmmi.o2switch.site/api.php" + 
                     "?format=json" + 
                     "&login=lenoirdavid" + 
                     "&message=" + encodeURIComponent(message) +//encode les caractères spéciaux 
                     "&mail=philippe.gambette@univ-eiffel.fr";
    
    // Q10 : Afficher URL dans console
    console.log(urlVisitee);
    
    // Q11 : Appel fetch 
    fetch(urlVisitee).then(function(response) {
        response.json().then(function(data){
            console.log("Réponse reçue : ");
            console.log(data);
            
            if(data.status === "success") {
                alert("✅ Message envoyé avec succès !");
                // Vider les champs
                champTitre.value = "";
                champDescription.value = "";
                champURL.value = "";
                // Reset preview
                document.querySelector(".preview-titre").textContent = "";
                document.querySelector(".preview-description").textContent = "";
                document.querySelector(".preview-image").src = "";
            } else {
                alert("❌ Erreur : " + data.message);
            }
        })
    });
});
    //Video API qui m'a aidé : https://youtu.be/WJOXT4IyTrU?si=V0ntTCuPH5gSYj7q + cours

    // Popup
    document.querySelectorAll(".image-cliquable").forEach(img => { // flèche pour indiquer le code qui va s'appliquer
        img.addEventListener("click", function () {
            document.querySelector(".popup-image").src = this.style.backgroundImage.slice(5, -2); //le slice est nécessaire pour afficher l'img, indiqe à partir de ou couper pourgarder que le jpg et pas url etc., le "this" est pour l'élément qui sera cliqué
            document.querySelector(".popup").classList.remove("popup-invisible"); //retire la classe qui le rend invisible
            document.querySelector(".popup").classList.add("popup-visible"); //remet --
        });
    });

    //le bloc de code qui suit est pour FERMER le pop-up 
    document.querySelector(".popup").addEventListener("click", function (e) {
        if (e.target === this) this.classList.remove("popup-visible"), this.classList.add("popup-invisible");
    });
    document.querySelector(".cache-fenetre").addEventListener("click", function () {
        document.querySelector(".popup").classList.remove("popup-visible");
        document.querySelector(".popup").classList.add("popup-invisible");
    });
})
