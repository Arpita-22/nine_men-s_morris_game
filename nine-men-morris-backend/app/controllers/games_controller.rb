class GamesController < ApplicationController
    def index
        games = Game.all
        render json: games, include: [:player_one, :player_two]
    end

    def new
    end

    def create
        player1 = Player.find_or_create_by(name: params["playerOneName"])
        player2 = Player.find_or_create_by(name: params["playerTwoName"])
        game = Game.create(player_one_id: player1.id,player_two_id: player2.id, move_time_limit: "1", turn:1)
        render json: game, include: [:player_one, :player_two]
    end

    def edit
    end
    
    def update
    end
    
end
