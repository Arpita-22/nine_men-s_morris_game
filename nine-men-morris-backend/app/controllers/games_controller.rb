class GamesController < ApplicationController
    def index
        games = Game.all
        render json: games, include: [:player_one, :player_two]
    end
end
