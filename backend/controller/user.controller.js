import db from "../config/database.js";
export const getUserData = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Only return useful fields (not password, etc.)
    const user = await db.User.findByPk(req.user.user_id, {
      attributes: ['user_id', 'full_name','email', 'role_id', 'base_id', 'created_at'],
      include: [
        {
          model: db.Role,
          as: 'role',
          attributes: ['role_name'],
        },
        {
          model: db.Base,
          as: 'assignedBase',
          attributes: ['base_name'],
        }
      ]
    });

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message:err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: ["user_id", "email", "full_name", "created_at", "role_id", "base_id"],
      include: [
        {
          model: db.Role,
          as: "role",
          attributes: ["role_name"]
        },
        {
          model: db.Base,
          as: "assignedBase",
         attributes: ["base_name"]
        }
      ]
    });
    res.json({ users });
  } catch (error) {
   // console.error("Error fetching users:", error);
    res.status(500).json({ message: error.message});
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const count = await db.User.destroy({ where: { user_id: userId } });
    if (!count) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    //console.error('DeleteUser error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  console.log('inside update')
  const { id:userId} = req.params;
  const { full_name, email, role_id, base_id } = req.body;

  try {
    const user = await db.User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.full_name = full_name || user.full_name;
    user.email = email || user.email;
    user.role_id = role_id || user.role_id;
    user.base_id = base_id || null;

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (err) {
   // console.error('updateUser error:', err);
    res.status(500).json({ message: err.message });
  }
};
