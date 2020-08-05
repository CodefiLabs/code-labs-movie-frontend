export class Movie {
    id: number
    description: string
    director: string
    image: string
    title: string
    year: number
    created_at: string
    updated_at: string
    constructor({
        id = 0,
        description = '',
        director = '',
        image = '',
        title = '',
        year = 0,
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
        this.created_at = created_at
        this.updated_at = updated_at
    }

}
