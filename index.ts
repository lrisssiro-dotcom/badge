import discord
from discord.ext import commands

TOKEN = "MTQ4MjY1MDQwMTk3ODQ0OTk5Mw.G63jG3.WO7bAfUHRN4jHOTeYn7-3D2yAXg0IpT0ZgXzZE"  # حط توكن البوت
CHANNEL_ID = 1413714001308684383  # ايدي روم التقديمات
ADMIN_ROLE_ID = 1482659672329687112  # ايدي رول الادارة

intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(command_prefix="!", intents=intents)

class ApplyModal(discord.ui.Modal, title="تقديم إدارة"):
    
    name = discord.ui.TextInput(label="اسمك", placeholder="اكتب اسمك هنا")
    age = discord.ui.TextInput(label="عمرك", placeholder="كم عمرك")
    experience = discord.ui.TextInput(label="خبرتك", style=discord.TextStyle.paragraph)

    async def on_submit(self, interaction: discord.Interaction):
        channel = bot.get_channel(1413714001308684383)

        embed = discord.Embed(
            title="تقديم إدارة جديد",
            color=discord.Color.blue()
        )
        embed.add_field(name="المتقدم", value=interaction.user.mention, inline=False)
        embed.add_field(name="الاسم", value=self.name.value, inline=False)
        embed.add_field(name="العمر", value=self.age.value, inline=False)
        embed.add_field(name="الخبرة", value=self.experience.value, inline=False)

        await channel.send(f"<@&{ADMIN_ROLE_ID}>", embed=embed)
        await interaction.response.send_message("تم ارسال تقديمك بنجاح ✅", ephemeral=True)

class ApplyButton(discord.ui.View):
    @discord.ui.button(label="تقديم إدارة", style=discord.ButtonStyle.green)
    async def apply(self, interaction: discord.Interaction, button: discord.ui.Button):
        await interaction.response.send_modal(ApplyModal())

@bot.command()
async def تقديم(ctx):
    embed = discord.Embed(
        title="التقديم للإدارة",
        description="اضغط الزر تحت للتقديم",
        color=discord.Color.green()
    )
    await ctx.send(embed=embed, view=ApplyButton())

bot.run(TOKEN)
