const cl=console.log;

const movieInput = document.getElementById('movieInput')
const btnAdd = document.getElementById('btnAdd')
const btnUpdate = document.getElementById('btnUpdate')
const listMovie = document.getElementById('listMovie')
const movieForm = document.getElementById('movieForm')

// let movieArray = [
//   {
//     Movietitle: "Inception",
//     id:"01"
//   },
//   {
//     Movietitle: "Interstellar",
//     id:"02"
//   },
//   {
//     Movietitle: "The Dark Knight",
//     id:"03"
//   },
//   {
//     Movietitle: "Forrest Gump",
//     id:"04"
//   }
// ];

// localStorage.setItem('movieArray', JSON.stringify(movieArray))
let movieArray = JSON.parse(localStorage.getItem('movieArray'))||[]

//read

function oncreateMovieList(arr){
    let result = "";
    arr.forEach((ele)=>{
        result +=` <li class="list-group-item d-flex justify-content-between align-items-center" id="${ele.id}">
                                <strong>${ele.Movietitle}</strong>
                                <div>
                                    <button onclick="editMovie(this)" class= "btn btn-sm text-info" roel="button">Edit</button>
                                    <button onclick="deleteMovie(this)" class="btn btn-sm text-danger"role="button">Delete</button>
                                </div>
                            </li>`
    })
    listMovie.innerHTML = result
}
oncreateMovieList(movieArray)

//create

function addMovie(eve){
    eve.preventDefault()
    let movieObj={
        Movietitle:movieInput.value,
        id:Date.now().toString()
    }
    movieArray.push(movieObj)
    movieForm.reset()
    localStorage.setItem('movieArray', JSON.stringify(movieArray))
    let li = document.createElement('li')
    li.className = 'list-group-item d-flex justify-content-between align-items-center' 
    li.id = movieObj.id
    li.innerHTML = `<strong>${movieObj.Movietitle}</strong>
                                <div>
                                    <button onclick="editMovie(this)" class= "btn btn-sm text-info" roel="button">Edit</button>
                                    <button onclick="deleteMovie(this)" class="btn btn-sm text-danger"role="button">Delete</button>
                                </div>`
    listMovie.append(li)

    Swal .fire({
        title:'Data added successfully !!!',
        icon:'success',
        timer:3000
    });
}

//delete

function deleteMovie(ele){
    let removeId = ele.closest('li').id;
    let getconfirmation = confirm(`Are you sure, you want to remove id ${removeId}`)
    if(getconfirmation){
        let getIndex = movieArray.findIndex(r=>r.id === removeId)
        movieArray.splice(getIndex, 1)
        localStorage.setItem('movieArray', JSON.stringify(movieArray))
        ele.closest('li').remove()
    }

    Swal .fire({
        title:'Data deleted successfully !!!',
        icon:'success',
        timer:3000
    });
}


//edit

function editMovie(ele){
    let editId = ele.closest('li').id;
    cl(editId);
    localStorage.setItem('editId', editId)
    let editObj = movieArray.find(q=>q.id === editId)
    movieInput.value = editObj.Movietitle;
    btnAdd.classList.add('d-none');
    btnUpdate.classList.remove('d-none');
}


//update

function updateMovie(){
    let updateId = localStorage.getItem('editId')
    localStorage.removeItem('editId')
    let updateObj={
        Movietitle:movieInput.value,
        id:updateId
    }
    let getIndex = movieArray.findIndex(y=>y.id === updateId)
    movieArray[getIndex]=updateObj;
    localStorage.setItem('movieArray', JSON.stringify(movieArray))
    document.getElementById(updateId).querySelector('strong').innerHTML = updateObj.Movietitle
    movieForm.reset()
    btnAdd.classList.remove('d-none')
    btnUpdate.classList.add('d-none')

    Swal .fire({
        title:'Data updated successfully !!!',
        icon:'success',
        timer:3000
    });
}

movieForm.addEventListener('submit', addMovie)
btnUpdate.addEventListener('click', updateMovie)