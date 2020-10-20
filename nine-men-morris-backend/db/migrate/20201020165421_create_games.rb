class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :player_one_id
      t.integer :player_two_id
      t.string :move_time_limit
      t.integer :turn

      t.timestamps
    end
  end
end
