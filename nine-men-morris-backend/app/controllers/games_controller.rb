class GamesController < ApplicationController
    def index
        games = Game.all
        render json: games, include: [:player_one, :player_two]
    end

    def show
        game = Game.find(params[:id])
        player1 = Player.find(params["playerOneId"])
        player2 = Player.find(params["playerTwoId"])
        render json: game, include: [:player_one, :player_two]
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

        game = Game.find(params[:id])
        player1 = Player.find(params["playerOneId"])
        player2 = Player.find(params["playerTwoId"])
        game.update(player_one_id: player1.id,player_two_id: player2.id, move_time_limit: "1", turn:1)
        render json: game, include: [:player_one, :player_two]
    end

    private
    def game_params
        params.require(:game).permit(:player_one_id,:player_two_id,:move_time_limit, :turn)
    end

end
