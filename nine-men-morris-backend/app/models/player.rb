class Player < ApplicationRecord
    has_many :games, class_name: "Game"
    has_many :pieces
end
