import { ButtonBuilder, Colors, EmbedBuilder} from "discord.js";
import { Component } from "../classes/component";
import { ComponentContext } from "../classes/componentContext";
import { UserDetails } from "@zeldafan0225/ai_horde";


export default class extends Component {
    constructor() {
        super({
            name: "update_team",
            staff_only: false,
            regex: /update_team/
        })
    }

    override async run(ctx: ComponentContext<ComponentType.SelectMenu>): Promise<any> {
        const query = ctx.interaction.options.getString("query")
        const teams = await ctx.ai_horde_manager.getTeams()
        const team = teams.find(t => t.id?.toLowerCase() === query?.toLowerCase() || t.name?.toLowerCase() === query?.toLowerCase())
        if(query && team) {
            const delete_btn = new ButtonBuilder({
                label: "Delete this message",
                custom_id: `delete_${ctx.interaction.user.id}`,
                style: 4
            })
            const refresh_btn = new ButtonBuilder({
                label: "Refresh",
                style: 2,
                custom_id: "update_team"
            })
            const embed = new EmbedBuilder({
                title: `Team Details`,
                color: Colors.Blue,
                description: `Name: \`${team.name}\`
Info: ${team.info}

**Stats**
Requests Fulfilled: \`${team.requests_fulfilled}\`
Kudos: \`${team.kudos}\`
Online since: <t:${Math.floor(Date.now()/1000) - (team.uptime ?? 0)}:R>
Workers: \`${team.worker_count}\`
Performance: \`${team.performance}\` Megapixelsteps per second
Speed: \`${team.speed}\` Megapixelsteps per second`,
                footer: {text: team.id!}
            })

            ctx.interaction.reply({
                embeds: [embed],
                components: [{type: 1, components: [delete_btn, refresh_btn]}]
            })
        } else {
            return ctx.error({error: "Unable to find team"})
        }
    }

    override async autocomplete(context: AutocompleteContext): Promise<any> {
        const option = context.interaction.options.getFocused(true)
        switch(option.name) {
            case "query": {
                const teams = await context.ai_horde_manager.getTeams()
                if(context.client.config.advanced?.dev) console.log(teams)
                const available = teams.filter(t => t.name?.toLowerCase().includes(option.value.toLowerCase()) || t.id?.toLowerCase().includes(option.value.toLowerCase())).map(t => ({name: `${t.name} | ${t.id}`, value: t.id!}))
                return await context.interaction.respond(available.slice(0, 25))
            }
        }
    }
}