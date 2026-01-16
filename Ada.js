document.addEventListener('DOMContentLoaded', () => {
    const adaElement = document.getElementById('ascii-ada');
    const adaText = document.getElementById('ada-text');
    let originalText = "";

    // Cacher le texte explicatif au départ
    if (adaText) {
        adaText.style.visibility = "hidden";
        adaText.style.opacity = "0";
        adaText.style.transition = "opacity 1s";
    }

    // Sauvegarder et effacer le contenu initial de #ascii-ada pour qu'il soit invisible au départ
    if (adaElement) {
        originalText = adaElement.textContent;
        adaElement.textContent = "";
    }

    // Fonction typeWriter réutilisée et adaptée de asciiWrite.js
    function startAdaTypewriter() {
        if (!adaElement || !originalText) return;

        // Réinitialiser si on clique à nouveau
        let i = 0;
        let currentTextContent = "";
        const speed = 1; 
        const CHUNK_SIZE = 100; 

        // On s'assure que l'élément est vide avant de commencer
        adaElement.textContent = "";

        function typeWriter() {
            if (i < originalText.length) {
                const endIndex = Math.min(i + CHUNK_SIZE, originalText.length);
                currentTextContent += originalText.substring(i, endIndex);
                i = endIndex;
                
                adaElement.textContent = currentTextContent; 
                
                setTimeout(typeWriter, speed);
            } else {
                // Fin de l'animation ASCII
                adaElement.style.borderRight = 'none';
                
                // Faire apparaître le texte à côté
                if (adaText) {
                    AdaText();
                }
            }
        }
        

        typeWriter();
    }

    // Utilisation de la délégation d'événement car les boutons #yes et #no sont créés dynamiquement
    document.addEventListener("click", function (e) {
        if (e.target && (e.target.id === "yes" || e.target.id === "no")) {
            console.log(e.target.id); // Log comme demandé précédemment
            startAdaTypewriter();
            e.target.disabled = true; // Désactiver le bouton après le clic
            
            
        }
    });
    
});



// animation2.js

function AdaText() {
    let j = 0;
    
    // Le texte inclut maintenant des balises HTML !
    const adatext = `
     So this is Ada Lovelace, she is the mother of programming! She wrote the first algorithm in the history of humanity for the babbage machine, an really old mechanical computer.`;
    
    const speed2 = 10; // Vitesse de frappe (lettres)
    let outputElement2 = document.getElementById("ada-text"); 
    
    // S'assurer que nous utilisons innerHTML pour interpréter les balises
    let currentContent = ""; 

    if (!outputElement2) {
        console.error("Élément #ascii2 non trouvé.");
        return;
    }

    function taper2() {
        if (j < txt2.length) {
            
            let char = txt2.charAt(j);
            
            // ⭐ LOGIQUE CLÉ : Détection d'une balise HTML
            if (char === '<') {
                
                // 1. Trouver la fin de la balise (index du '>')
                const finBalise = txt2.indexOf('>', j);
                
                if (finBalise !== -1) {
                    // 2. Extraire la balise entière (ex: '<span class="green">')
                    const baliseComplete = txt2.substring(j, finBalise + 1);
                    
                    // 3. Ajouter la balise au contenu (le navigateur l'interprétera)
                    currentContent += baliseComplete;
                    
                    // 4. Avancer l'index 'j' jusqu'à après la balise
                    j = finBalise + 1;
                    
                } else {
                    // Cas d'erreur si '<' est présent mais pas de '>' (traiter comme texte simple)
                    currentContent += char;
                    j++;
                }
                
            } else {
                // Si c'est un caractère normal
                currentContent += char;
                j++;
            }
            
            // 5. Mettre à jour le DOM en utilisant innerHTML
            outputElement2.innerHTML = currentContent;
            
            // 6. Planifier le prochain cycle
            setTimeout(taper2, speed2);
        }
        // else: Animation 2 terminée
    }
    
    taper2();
}