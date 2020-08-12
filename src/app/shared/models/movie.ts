export class Movie {
    id: number
    user_id: number
    cast: string
    description: string
    director: string
    image: string
    title: string
    year: number
    parental_rating: string
    rating: number
    duration: number
    total_gross: number
    created_at: string
    updated_at: string
    release_date: string
    constructor({
        id = null,
        user_id = null,
        cast = '',
        description = '',
        director = '',
        image = '',
        title = '',
        year = null,
        parental_rating = '',
        rating = null,
        duration = null,
        total_gross = null,
        created_at = '',
        updated_at = '',
        release_date = '',
        ...rest
    }) {
        Object.assign(this, rest)
        this.id = id
        this.user_id = user_id
        this.cast = cast
        this.description = description
        this.director = director
        this.image = image
        this.title = title
        this.year = year
        this.parental_rating = parental_rating
        this.rating = rating
        this.duration = duration
        this.total_gross = total_gross
        this.created_at = created_at
        this.updated_at = updated_at
        this.release_date = release_date
    }

}
