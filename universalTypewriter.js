// Universal Typewriter Effect
// This function applies a typewriter effect to all text elements on the page

function universalTypewriter() {
    // Configuration
    const SPEED = 5; // Speed in milliseconds per character
    const CHUNK_SIZE = 1; // Characters per frame (1 for pure typewriter effect)
    
    // Store all text nodes and their original content
    const textNodes = [];
    
    // Function to collect all text nodes from the DOM
    function collectTextNodes(element) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Skip empty text nodes and script/style content
                    if (node.parentElement.tagName === 'SCRIPT' || 
                        node.parentElement.tagName === 'STYLE' ||
                        node.textContent.trim() === '') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );
        
        let node;
        while (node = walker.nextNode()) {
            textNodes.push({
                node: node,
                originalText: node.textContent,
                currentIndex: 0
            });
            // Clear the text initially
            node.textContent = '';
        }
    }
    
    // Collect all text nodes from body
    collectTextNodes(document.body);
    
    // Animation state
    let globalIndex = 0;
    let currentNodeIndex = 0;
    let currentCharIndex = 0;
    
    // Main animation function
    function animate() {
        if (currentNodeIndex >= textNodes.length) {
            // Animation complete
            return;
        }
        
        const currentNode = textNodes[currentNodeIndex];
        
        if (currentCharIndex < currentNode.originalText.length) {
            // Add next character(s)
            const endIndex = Math.min(
                currentCharIndex + CHUNK_SIZE,
                currentNode.originalText.length
            );
            
            currentNode.node.textContent = currentNode.originalText.substring(0, endIndex);
            currentCharIndex = endIndex;
            
            // Schedule next frame
            setTimeout(animate, SPEED);
        } else {
            // Move to next node
            currentNodeIndex++;
            currentCharIndex = 0;
            
            // Continue immediately with next node
            setTimeout(animate, SPEED);
        }
    }
    
    // Start the animation
    animate();
}

// Alternative version that handles HTML content
function universalTypewriterHTML(containerSelector = 'body', speed = 5, asciiSpeed = 0.5, asciiChunkSize = 50) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error(`Container ${containerSelector} not found`);
        return;
    }
    
    // Get the complete HTML content
    const originalHTML = container.innerHTML;
    let currentIndex = 0;
    let displayContent = '';
    let isInPreTag = false;
    
    // Clear the container
    container.innerHTML = '';
    
    function typeHTML() {
        if (currentIndex < originalHTML.length) {
            const char = originalHTML.charAt(currentIndex);
            
            // If we encounter an HTML tag, add it all at once
            if (char === '<') {
                const closeTagIndex = originalHTML.indexOf('>', currentIndex);
                if (closeTagIndex !== -1) {
                    // Get the complete tag
                    const tag = originalHTML.substring(currentIndex, closeTagIndex + 1);
                    displayContent += tag;
                    currentIndex = closeTagIndex + 1;
                    
                    // Check if we're entering or leaving a <pre> tag (ASCII art)
                    if (tag.toLowerCase().startsWith('<pre')) {
                        isInPreTag = true;
                    } else if (tag.toLowerCase() === '</pre>') {
                        isInPreTag = false;
                    }
                } else {
                    // Invalid HTML, just add the character
                    displayContent += char;
                    currentIndex++;
                }
            } else {
                // Regular character or ASCII art
                if (isInPreTag) {
                    // Inside ASCII art - add chunks of characters at once
                    const endIndex = Math.min(currentIndex + asciiChunkSize, originalHTML.length);
                    let chunk = '';
                    
                    // Collect chunk, but stop at the next tag
                    for (let i = currentIndex; i < endIndex; i++) {
                        if (originalHTML.charAt(i) === '<') {
                            break;
                        }
                        chunk += originalHTML.charAt(i);
                    }
                    
                    displayContent += chunk;
                    currentIndex += chunk.length;
                } else {
                    // Regular text - add one character at a time
                    displayContent += char;
                    currentIndex++;
                }
            }
            
            // Update the display
            container.innerHTML = displayContent;
            
            // Continue animation with appropriate speed
            const currentSpeed = isInPreTag ? asciiSpeed : speed;
            setTimeout(typeHTML, currentSpeed);
        }
    }
    
    // Start the animation
    typeHTML();
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { universalTypewriter, universalTypewriterHTML };
}
