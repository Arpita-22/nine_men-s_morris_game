# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Game.destroy_all
Piece.destroy_all
Player.destroy_all

p1 = Player.create(name: "apple",score: 0)
p2 = Player.create(name: "orange",score: 0)

piece1 = Piece.create(player_id: p1.id, current_position:"0-0")
piece2 = Piece.create(player_id: p2.id, current_position:"0-6")

game1 = Game.create(player_one_id: p1.id, player_two_id: p2.id, turn: p1.id, move_time_limit:"1")
