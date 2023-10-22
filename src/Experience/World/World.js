import Experience from '../Experience.js'
import Environment from './Environment.js'
import * as THREE from 'three'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            this.environment = new Environment()
        })
    }

    update()
    {
    }
}
