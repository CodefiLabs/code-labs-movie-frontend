export class Movie {
    id: number
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
    constructor({
        id = 0,
        description = '',
        director = '',
        image = '',
        title = '',
        year = 0,
        parental_rating = '',
        rating = 0,
        duration = 0,
        total_gross = 0,
        created_at = '',
        updated_at = '',
        ...rest
    }) {
        Object.assign(this, rest)
        this.id = id
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
    }

}
