class RenameSkillsToUserHistory < ActiveRecord::Migration[7.0]
  def change
    rename_column :users, :skills, :History
  end
end