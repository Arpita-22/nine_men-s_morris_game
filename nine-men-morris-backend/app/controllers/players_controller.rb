class PlayersController < ApplicationController
    def index
        players = Player.all
        render json: players, include:[:games]
    end

    def show
        player = Player.find(params[:id])
        render json: player, include:[:games]
    end

    def create
        player = Player.create(params[:id], params[:name], score: 0)
        render json: player, include:[:games]
    end
end
