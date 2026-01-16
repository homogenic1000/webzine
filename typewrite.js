
// animation2.js

function aboutWebzine() {
    let j = 0;
    
    // Le texte inclut maintenant des balises HTML !
    const txt2 = `
    <h1>
        this fanzine is dedicated to all the woman in the world who code, build, design, create, invent, innovate and inspire. without them we woudn't be able to play our favorite game, surfing the web, to listent to music , to facetime our friends and family, to do motion design, to create digital art, to see the echograph of our unborn childs.
    <br>
    <br>
    When we talk about the pioneers of compture science, we often talk about Alan Turing as the father of this field but behind every father the is a mother and it was <span class="green">Ada Lovelace</span> <br>
    Do you know who is she ?
    </h1>
    <div class="button-container"> 
        <button  id="yes" class="btn">girl im'not a looser i know who she is</button>
        <button id="no" class="btn">who the fuck is that</button>
    </div> 
        `;
    
    const speed2 = 10; // Vitesse de frappe (lettres)
    let outputElement2 = document.getElementById("text-container"); 
    
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