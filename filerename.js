function renameFiles() {
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const popup = document.getElementById('popup');
    fileList.innerHTML = '';

    if (fileInput.files.length === 0) {
        alert('Please select a folder containing files.');
        return;
    }

    const files = Array.from(fileInput.files);
    const zip = new JSZip();

    files.forEach((file) => {
        let originalName = file.name;
        let newName = originalName
            .toLowerCase()
            .replace(/\s+/g, '-')    // spaces with hyphens
            .replace(/_/g, '-')      // underscores with hyphens
            .replace(/-+/g, '-');    // multiple hyphens with a single hyphen

        const li = document.createElement('li');
        li.textContent = `Original: ${originalName} => New: ${newName}`;
        fileList.appendChild(li);

        zip.file(newName, file); 
    });

    
    popup.style.display = "flex";

    
    window.downloadZip = function() {
        zip.generateAsync({ type: "blob" }).then(function(content) {
            saveAs(content, "renamed_files.zip");
            
            popup.style.display = "none";
            location.reload(); 
        });
    };
}

