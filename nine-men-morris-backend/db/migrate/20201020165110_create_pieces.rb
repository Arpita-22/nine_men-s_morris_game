class CreatePieces < ActiveRecord::Migration[6.0]
  def change
    create_table :pieces do |t|
      t.integer :player_id
      t.string :current_position

      t.timestamps
    end
  end
end
