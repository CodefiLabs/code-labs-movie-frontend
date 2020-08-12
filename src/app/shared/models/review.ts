export class Review {
    id: number
    body: string
    title: string
    movie_id: number
    user_id: number
    rating: number
    created_at: string
    updated_at: string
    constructor({
        id = 0,
        body = '',
        title = '',
        movie_id = 0,
        user_id = 0,
        rating = 5,
        created_at = '',
        updated_at = '',
        ...rest
    }) {
        Object.assign(this, rest)
        this.id = id
        this.body = body
        this.title = title
        this.movie_id = movie_id
        this.user_id = user_id
        this.rating = rating
        this.created_at = created_at
        this.updated_at = updated_at
    }

}
