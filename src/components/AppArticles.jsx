import { useState } from 'react'
import articles from '../data/articles';

function AppArticles() {
    // Valori per input 
    //Article Title
    const [newTitle, setTitle] = useState("");
    // Article Author
    const [newAuthor, setAuthor] = useState("");
    // Article State
    const [newState, setState] = useState("");

    const checkStateClass = (selectedValue) => {
        let stateClass;
        if (selectedValue === "Published") {
            stateClass = "btn-success"
        } else if (selectedValue === "Draft") {
            stateClass = "btn-warning"
        } else {
            stateClass = "btn-primary"
        }
        return stateClass;
    }

    // Valori per form
    const [articlesList, setArticlesList] = useState(articles);

    // Submit Function
    const handleSubmit = (event) => {
        event.preventDefault()
        const newArticle = {
            id: Date.now(),
            title: newTitle,
            author: newAuthor
        }
        setArticlesList([...articlesList, newArticle]);
        setTitle("");
    }

    // Delete Function
    const handleDelete = (articleToDelete) => {
        const filteredList = articlesList.filter(curArticle => curArticle !== articleToDelete)
        setArticlesList(filteredList);
    }

    return (
        <>
            {/* Form */}
            <section className="pt-4">
                <h3>Add Article</h3>
                <form onSubmit={handleSubmit} className='mt-4'>
                    <div className='w-50'>
                        <label htmlFor="articleTitle" className='form-label'>Article Title</label>
                        <input className='form-control' value={newTitle} onChange={(event) => setTitle(event.target.value)} type="text" id='articleTitle' />
                    </div>
                    <div className="w-50 mt-3">
                        <label htmlFor="articleAuthor" className='form-label'>Article Author</label>
                        <input className='form-control' value={newAuthor} onChange={(event) => setAuthor(event.target.value)} type="text" id='articleAuthor' />
                    </div>
                    <div className="w-50 mt-3">
                        <select onChange={(event) => setState(event.target.value)} className="form-select" aria-label="Article State">
                            <option value="Published">Published</option>
                            <option value="Draft">Draft</option>
                            <option value="Review">Review</option>
                        </select>
                    </div>
                    <button type='submit' className="btn btn-primary mt-3">Salva</button>
                </form>
            </section>

            {/* Articles */}
            <section className='mt-5'>
                <h3 className='pb-3'>My Articles</h3>
                {articlesList.length !== 0 ? articlesList.map(curArticle =>
                    <div key={curArticle.id} className="mb-3">
                        <div className="card">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <h6 className='m-0'>{curArticle.title} - {curArticle.author}</h6>
                                <span className={`btn btn-sm ${checkStateClass(curArticle.state)}`}>{curArticle.state}</span>
                                <button onClick={() => handleDelete(curArticle)} className='btn btn-outline-danger'>Delete</button>
                            </div>
                        </div>
                    </div>) : <p>Nessun Articolo Disponibile</p>}
            </section>
        </>
    )
}

export default AppArticles;