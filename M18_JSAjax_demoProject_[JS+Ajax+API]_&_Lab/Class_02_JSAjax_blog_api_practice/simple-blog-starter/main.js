// Utility Functions:
/**
 * Converts an ISO timestamp into a "Month Day, Year" format.
 * @param {string} isoString - The date string (e.g., "2024-10-30T20:48:43.000000Z")
 * @returns {string} - Formatted date (e.g., "October 30, 2024")
 */
function formatDate(isoString) {
    if (!isoString) return "";

    const date = new Date(isoString);
    
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

// Modal functions
function openModal(postId) {
    console.log("POSTID here:--",postId);
    
    const modal = document.getElementById('postModal');
    if (modal) {
        document.body.classList.add('modal-open');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    // READ MORE DETAILS:--- with COMMENTS
    const fetchDetails = async()=>{
        const response = await axios.get(`https://basic-blog.teamrabbil.com/api/post-details/${postId}`);


        console.log("Details response: ", response.data);
        const postDetails = response.data.postDetails;
        const postCommenter = response.data.postComments;

        document.querySelector("#titleOfDetails").textContent = postDetails.title || "Content Details"; // If title not present, then use fallback Title.
        document.querySelector("#imgOfDetails").setAttribute('src', postDetails.img);   //will replace any existing src attribute
        document.querySelector("#detailsOfDetails").innerHTML = `
            <p class="text-gray-700 mb-8">
                ${postDetails.content}
            </p>
        `;

        // COMMENTS LOADING:--
        const el_commentDiv = document.querySelector("#commentsOfDetails");
        el_commentDiv.innerHTML = "";
        postCommenter.forEach(comment => {
            el_commentDiv.innerHTML += `
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div class="flex items-center gap-3 mb-3">

                        <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                            ${comment.author[0]}
                        </div>

                        <div>
                            <div class="font-semibold text-gray-800">${comment.author}</div>
                            <div class="text-sm text-gray-500">${formatDate(comment.created_at)}</div>
                        </div>
                    </div>

                    <p class="text-gray-600 leading-relaxed">${comment.comment}</p>


                </div>
            `;
        });

        // COMMENT POSTING (POST):---
        const commentAuthor = document.querySelector("#authorName");
        const commentTextContent = document.querySelector("#commentText");
        const postID = postDetails.list_id;
        const submitBtn = document.querySelector("#commentSubmitBtn");

        // SUBMITTING a Comment:
        /**
         * One important Note:
        Every time you click openModal, you are adding a new event listener to submitBtn without removing the old one. This will cause the comment to be posted multiple times (and show multiple alerts) after you open the modal a few times.
        Quick fix: Use submitBtn.onclick = async (e) => { ... } instead of addEventListener, or move the listener outside the openModal function.

        * The difference between
            submitBtn.onclick = async (e) => { ... } and, submitBtn.addEventListener('click', (e) => {...}) is
        
            \\===| Overwriting VS Stacking |===//
        ==> onclick = ...: This is a property. You can only assign one function to it. If you assign a new one, the old one is completely replaced.
        If you use onclick (Quick Fix):
            Each time the modal opens, the new function overwrites the previous one. Clicking "Submit" will only ever trigger the code once, regardless of how many times you've opened the modal.
        ----------------------------------------------------------------------------------------------
        ==> addEventListener(): This is a method. You can call it as many times as you want on the same element to attach multiple different functions to the same "click" event
        If you use addEventListener (Current Issue):
            Each time the modal opens, a new listener is added to the button. If you open the modal 5 times, clicking "Submit" once will trigger the code 5 times, resulting in 5 API calls and 5 alerts.
            */

        submitBtn.onclick = async (e) => {
            e.preventDefault();
            PAYLOAD =  {
                        "list_id": postID,
                        "author": commentAuthor.value,
                        "comment": commentTextContent.value
                    };

            // Validation
            if (!PAYLOAD.author || !PAYLOAD.comment) {
                alert("Please fill in both name and comment.");
                return;
            }

            try{
                // Calling API to POST comment:
                await axios.post(`https://basic-blog.teamrabbil.com/api/create-comment`, PAYLOAD);
                window.alert("Comment Posted Sucessfully");

                // 1. Get current date as an ISO string
                const currentIsoString = new Date().toISOString();

                // Adding the newly posted comment:
                el_commentDiv.innerHTML += `
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div class="flex items-center gap-3 mb-3">

                        <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                            ${commentAuthor.value[0]}
                        </div>

                        <div>
                            <div class="font-semibold text-gray-800">${commentAuthor.value}</div>
                            <div class="text-sm text-gray-500">${formatDate(currentIsoString)}</div>
                        </div>
                    </div>

                    <p class="text-gray-600 leading-relaxed">${commentTextContent.value}</p>
                </div>`;

                // Clear the inputs after success
                document.querySelector("#authorName").value = "";
                document.querySelector("#commentText").value = "";

            }
            catch(err){
                console.error("Error posting comment:", error);
                alert("Failed to post comment. Please try again.");
            }

        };
        
    };
    fetchDetails();


}

function closeModal() {
    const modal = document.getElementById('postModal');
    if (modal) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }
}

// Close modal when clicking outside
document.getElementById('postModal')?.addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

//--------------------------------
let categoryList = {};

const postCardSection = document.querySelector("#postCards");

const handleCatClick = async(categoryId, categoryName)=>{
    console.log(`You Clicked on ${categoryName} with ID: ${categoryId}`);
    const response = await axios.get(`https://basic-blog.teamrabbil.com/api/post-list/${categoryId}`);
    postCardSection.innerHTML = ``; //first cleared the cards div

    response.data.forEach(obj => {
        postCardSection.innerHTML +=
        `<article class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden group">
            <div class="relative overflow-hidden">
                <img 
                    src=${obj.img} 
                    alt="Post Title" class="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300">
                
                <div class="absolute top-4 left-4">
                    <span class="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-purple-600 text-sm font-semibold">
                        ${categoryName}
                    </span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                    ${obj.title}
                </h3>
                <p class="text-gray-600 mb-4 line-clamp-2">
                    ${obj.short}
                </p>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-500">Dec 15, 2024</span>
                    <button onclick="openModal(${obj.id})" class="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-2 transition-colors">
                        Read more →
                    </button>
                </div>
            </div>
        </article>`;
    });
};

const fetchCategories = async ()=>{
    const catSelector = document.querySelector("#categories");

    const response = await axios.get("https://basic-blog.teamrabbil.com/api/post-categories");
    // console.log("API RESPONSE: ",response.data);
    
    response.data.forEach(el => {   //for each {objects} in [array]
        catSelector.innerHTML += `
                    <button onclick="handleCatClick(${el.id}, '${el.name}')"
                        class="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-purple-600 hover:text-white hover:shadow-lg hover:shadow-purple-200 transition-all text-sm sm:text-base whitespace-nowrap">
                        ${el.name}
                    </button>
                `;
        categoryList[el.id] = el.name.trim();   //list[idx] = value;
    });
};
fetchCategories();

// All button:
const fetchAll = async ()=>{
    const response = await axios.get(`https://basic-blog.teamrabbil.com/api/post-newest`);
    // console.log("in All btn: ", response.data);
    
    postCardSection.innerHTML = "";
    response.data.forEach(obj => {
        postCardSection.innerHTML +=
        `<article class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden group">
            <div class="relative overflow-hidden">
                <img 
                    src=${obj.img} 
                    alt="Post Title" class="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300">
                
                <div class="absolute top-4 left-4">
                    <span class="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-purple-600 text-sm font-semibold">
                        ${categoryList[obj.category_id]}
                    </span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                    ${obj.title}
                </h3>
                <p class="text-gray-600 mb-4 line-clamp-2">
                    ${obj.short}
                </p>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-500">Dec 15, 2024</span>
                    <button onclick="openModal(${obj.id})" class="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-2 transition-colors">
                        Read more →
                    </button>
                </div>
            </div>
        </article>`;
    });
};
fetchAll();